<template>
    <div class="login">
        <div class="bg-gray-50 min-h-screen flex items-center justify-center">
            <!-- Login container -->
            <div class="bg-gray-100 flex shadow-lg max-w-4xl  p-5">
                <!-- Form -->
                <div class="md:w-1/2 px-16">
                    <h2 class="font-bold text-2xl text-[#002d74]">Login</h2>
                    <p class="text-sm mt-4 mb-4 text-[#002d74]">If you already a member, easily log in</p>
                    <span class="break-words w-2 text-red-500" id="errorMessage"></span>
                    <Form class="flex flex-col gap-4" @submit="handleLogin" :validation-schema="loginFormSchema" autocomplete="off">
                        <div>
                            <Field class="p-2 rounded-xl border mt-8 w-full " type="text" name="userName"
                                placeholder="Tên đăng nhập" v-model="userName" />
                            <ErrorMessage name="userName" class="error-message" />
                        </div>
                        <div class="relative">
                            <Field class="p-2 rounded-xl border w-full" type="password" name="password"
                                placeholder="Mật khẩu" v-model="password" />
                            <ErrorMessage name="password" class="error-message" />
                            <!-- <span class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">icon</span> -->
                        </div>
                        <button class="bg-[#002d74] rounded-xl text-white py-2">Log in</button>
                    </Form>

                    <p class="mt-20 mb-10 text-xs border-b py-6">Forgot your password?</p>
                    <div class="text-sm flex justify-between items-center">
                        <p>Don't have an account?</p>
                        <router-link to="/register" class="py-2 px-4 bg-white border rounded-xl">Register</router-link>
                    </div>
                </div>
                <!-- Image -->
                <div class="w-1/2 md:block hidden">
                    <img src="@/assets/images/image-login.avif" class="rounded-2xl">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from "@/services/auth.service";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

import jwt_decode from "jwt-decode";
import socket from "@/plugins/socket";

import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup () {
        const store = useStore();
        const router = useRouter();

        const userName = ref();
        const password = ref();


        const loginFormSchema = yup.object().shape({
            userName: yup
                .string()
                .required("Xin nhập vào trường này"),
            password: yup
                .string()
                .required("Xin nhập vào trường này")
        });

        const handleLogin = async () => {
            try {
                const data = {
                    userName: userName.value,
                    password: password.value,
                }

                const response = await AuthService.login(data);
                if (response.status == 200) {
                    const access_token = await response.data.accessToken;

                    localStorage.setItem("token_of_hau", access_token);
                    
                    const decodedPayload = jwt_decode(access_token);

                    store.dispatch('auth/handleSetUser', decodedPayload);

                    if(decodedPayload.role == 'admin') {
                        window.location.href = '/haadminha/option_reports'
                    } else {
                        window.location.href = '/'
                    }
                }
            } catch (err) {
                if(err.response.status == 400) {
                    let errDiv = document.getElementById('errorMessage');
                    let errorText = document.createElement('p');
                    errorText.id = 'errorText';
                    let textNode = document.createTextNode(err.response.data);
                    errorText.appendChild(textNode);
                    errDiv.appendChild(errorText);
                }
            }
        }

        watch(userName, (newVal, oldVal) => {
            let errorText = document.getElementById('errorText');
            if(errorText) errorText.remove();
        })

        watch(password, (newVal, oldVal) => {
            let errorText = document.getElementById('errorText');
            if(errorText) errorText.remove();
        })

        return {
            handleLogin,
            userName,
            password,
            loginFormSchema,
        }
    },
}
</script>
<template>
    <Form id="changeForm" class="flex flex-col" @submit="handleUpdate" :validation-schema="changePassFormSchema">
        <span class="self-center text-xl font-bold mt-10">Thay đổi mật khẩu</span>
        <span id="errorMessage" class="self-center my-2"></span>
        <div class="flex flex-col items-stretch my-4">
            <div class="flex justify-start items-center mb-4">
                <aside class="h-fit basis-[200px] border-none px-8 text-right">
                    <label for="" class="font-bold text-sm">Mật khẩu cũ</label>
                </aside>
                <Field class="w-[50%] border-2 px-2 py-1 focus:border-black" v-model="oldPass" name="oldPass"
                    type="password" />
            </div>
            <ErrorMessage name="oldPass" class="error-message ml-[12.5rem] -mt-2 mb-2" />
            <div class="flex justify-start mb-4">
                <aside class="h-fit basis-[200px] border-none px-8 text-right">
                    <label for="" class="font-bold text-sm">Mật khẩu mới</label>
                </aside>
                <Field class="w-[50%] border-2 px-2 py-1 focus:border-black" v-model="newPass" name="newPass"
                    type="password" />
            </div>
            <ErrorMessage name="newPass" class="error-message ml-[12.5rem] -mt-2 mb-2" />
            <div class="flex justify-start mb-4">
                <aside class="h-fit basis-[200px] border-none px-8 text-right">
                    <label for="" class="font-bold text-sm">Nhập lại mật khẩu</label>
                </aside>
                <Field class="w-[50%] border-2 px-2 py-1 focus:border-black" v-model="passConfirm" name="passConfirm"
                    type="password" />
            </div>
            <ErrorMessage name="passConfirm" class="error-message ml-[12.5rem] -mt-2 mb-2" />
            <div class="flex justify-start items-center mb-4">
                <aside class="h-fit basis-[200px] border-none px-8 text-right">
                </aside>
                <button type="submit"
                    class="px-3 py-1 rounded-md text-white font-bold bg-cyan-500 cursor-pointer hover:bg-cyan-700">Gửi</button>
            </div>
        </div>
    </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref, watch } from "vue";
import { useStore } from "vuex";
import * as yup from "yup";

import authService from "@/services/auth.service";


export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const store = useStore();

        const oldPass = ref();
        const newPass = ref();
        const passConfirm = ref();
        const errorMessage = ref();

        watch(oldPass, (newVal) => {
            errorMessage.value = '';
            const message = document.querySelector('#errorMessage');
            message.innerText = errorMessage.value;
        })

        const changePassFormSchema = yup.object().shape({
            oldPass: yup
                .string()
                .required('Xin nhập vào trường này'),
            newPass: yup
                .string()
                .required("Xin nhập vào trường này")
                .matches(
                    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
                    "Ít nhất 8 kí tự, phải có kí tự thường, in hoa và kí tự đặc biệt (@$!%*#?&)"
                ),
            passConfirm: yup
                .string()
                .required("Xin nhập vào trường này")
                .oneOf([yup.ref('newPass'), null], 'Mật khẩu không khớp')
        });

        const handleUpdate = async () => {
            try {
                const data = {
                    userId: store.state.auth.user._id,
                    password: oldPass.value,
                    newPass: newPass.value,
                }

                const response = await authService.changePassword(data);
                if (response.status == 201) {
                    errorMessage.value = response.data;

                    const message = document.querySelector('#errorMessage');
                    message.classList.toggle('text-green');
                    message.innerText = errorMessage.value;
                }

            } catch (err) {
                errorMessage.value = err.response.data;

                const message = document.querySelector('#errorMessage');
                message.classList.toggle('text-red');
                message.innerText = errorMessage.value;
            }
        }
        return {
            handleUpdate,
            changePassFormSchema,
            oldPass,
            newPass,
            passConfirm,
        }
    }
}
</script>
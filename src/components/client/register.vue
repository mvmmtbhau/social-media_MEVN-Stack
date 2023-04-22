<template>
    <div class="register">
      <div class="bg-gray-50 min-h-screen flex items-center justify-center">
        <!-- Login container -->
        <div class="bg-gray-100 flex shadow-lg max-w-4xl  p-5">
          <!-- Form -->
          <div class="md:w-1/2 px-16">
            <h2 class="font-bold text-2xl text-[#002d74]">Sign Up</h2>
            <p class="text-sm my-4 text-[#002d74]">If you already a member, easily log in</p>
  
            <Form class="flex flex-col gap-4" @submit="handleSignUp" :validation-schema="signUpFormSchema" autocomplete="off">
                <Field name="fullName" v-model="fullName" class="py-2 px-4 max-w-full rounded-xl border" type="text"
                    placeholder="Tên đầy đủ" />
                  <ErrorMessage class="error-message" name="fullName" />
              <Field name="userName" v-model="userName" class="py-2 px-4 rounded-xl border " type="text"
                placeholder="Tên đăng nhập" />
              <ErrorMessage class="error-message" name="userName" />
              <div class="relative">
                <Field name="password" v-model="password" class="py-2 px-4 rounded-xl border w-full" type="password"
                  placeholder="Mật khẩu" />
                <ErrorMessage class="error-message" name="password" />
                <!-- <span class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">icon</span> -->
              </div>
              <div class="relative">
                <Field name="passwordConfirm" v-model="passwordConfirm" class="py-2 px-4 rounded-xl border w-full"
                  type="password" placeholder="Nhập lại mật khẩu" />
                <ErrorMessage class="error-message" name="passwordConfirm" />
                <!-- <span class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">icon</span> -->
              </div>
              <button class="bg-[#002d74] rounded-xl text-white py-2">Sign Up</button>
            </Form>
            <div class="mt-10 grid grid-cols-3 items-center text-gray-500">
              <hr class="border-gray-500">
              <p class="text-center text-sm">OR</p>
              <hr class="border-gray-500">
            </div>
  
            <button class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center">
              <span class="mr-3 text-sm">icon</span>
              Sign up with Google
            </button>
            <div class="text-sm flex justify-between items-center pt-5">
              <p>You already have account?</p>
              <router-link to="/login" class="py-2 px-4 bg-white border rounded-xl">Login</router-link>
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
  
  export default {
    name: 'Register',
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      const signUpFormSchema = yup.object().shape({
        fullName: yup
          .string()
          .required("Xin nhập vào trường này")
          .min(8, 'Họ tên phải ít nhất có 8 kí tự')
          .max(50, 'Họ tên nhiều nhất có 50 kí tự'),
        userName: yup
          .string()
          .required("Xin nhập vào trường này")
          .min(8, 'Tên đăng nhập phải ít nhất có 8 kí tự')
          .max(30, 'Tên đăng nhập nhiều nhất có 30 kí tự'),
        password: yup
          .string()
          .required("Xin nhập vào trường này")
          .min(8, 'Mật khẩu ít nhất 8 kí tự'),
        passwordConfirm: yup
          .string()
          .required("Xin nhập vào trường này")
          .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
      });
      return {
        fullName: '',
        userName: '',
        password: '',
        passwordConfirm: '',
        signUpFormSchema,
      }
    },
    methods: {
      async handleSignUp() {
        const data = {
          fullName: this.fullName,
          userName: this.userName,
          password: this.password,
        }
  
        try {
          const response = await AuthService.register(data);
          if (response.status === 201) {
            this.$router.push({
              name: 'Login'
            })
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  </script>
  
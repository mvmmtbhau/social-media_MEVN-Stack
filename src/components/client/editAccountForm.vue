<template>
        <Form @submit.prevent="handleUpdate" :validation-schema="editFormSchema">
            <div class="flex items-center ml-28 gap-6 pt-5 ">
                <img v-if="this.$store.state.auth.user?.avatar"
                    :src="publicImage + this.$store.state.auth.user?.avatar.filename" class="w-10 h-10 rounded-full">
                <img v-else src="../../assets/images/no-avatar.jfif" class="w-10 h-10 rounded-full">
                <Field hidden type="file" v-model="avatar" name="avatar" id="avatar" />
                <label for="avatar" class="font-bold text-sm text-cyan-500 cursor-pointer hover:text-black">Thay đổi ảnh đại
                    diện</label>
            </div>
            <div class="flex flex-col items-stretch my-4">
                <div class="flex justify-start items-center mb-4">
                    <aside class="h-fit basis-[180px] border-none px-8 text-right">
                        <label for="" class="font-bold text-sm">Tên</label>
                    </aside>
                    <Field class="w-[50%] border-2 px-2 py-1 focus:border-black" v-model="fullName" name="fullName"
                        type="text" />
                </div>
                <ErrorMessage name="fullName" class="error-message ml-44 -mt-4 mb-2" />
                <div class="flex justify-start mb-4">
                    <aside class="h-fit basis-[180px] border-none px-8 text-right">
                        <label for="" class="font-bold text-sm">Tiểu sử</label>
                    </aside>
                    <div class="flex flex-col w-[50%]">
                        <Field v-model="bio" rows="5" name="bio" as="textarea"
                            class="border-2 px-2 py-1 focus:border-black resize-none">
                        </Field>
                        <div class="flex gap-1 text-sm mt-2 text-gray-500">
                            <p>{{ bio ? bio.length : 0 }}</p>
                            <p>/</p>
                            <p>150</p>
                        </div>
                        <ErrorMessage name="bio" class="error-message" />
                    </div>
                </div>
                <div class="flex justify-start items-center mb-4">
                    <aside class="h-fit basis-[180px] border-none px-8 text-right">
                        <label for="" class="font-bold text-sm">Giới tính</label>
                    </aside>
                    <Field name="gender" v-model="gender" as="select" class="w-[50%] border-2 px-2 py-1 focus:border-black">
                        <option value="0">
                            <span class="py-10">Nam</span>
                        </option>
                        <option value="1">
                            <span cl ass="py-10">Nữ</span>
                        </option>
                    </Field>
                </div>
                <div class="flex justify-start items-center mb-4">
                    <aside class="h-fit basis-[180px] border-none px-8 text-right">
                    </aside>
                    <button type="submit"
                        class="px-3 py-1 rounded-md text-white font-bold bg-cyan-500 cursor-pointer hover:bg-cyan-700">Gửi</button>
                </div>
            </div>
        </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useStore } from 'vuex';
import { ref } from 'vue';
import authService from "@/services/auth.service";
import { publicImage } from "@/constants";
export default {
    name: 'ediAccount',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const store = useStore();
        let fullName = ref(store.state.auth.user.fullName);
        let gender = ref(store.state.auth.user.gender);
        let bio = ref(store.state.auth.user.bio);
        let avatar = ref();

        const editFormSchema = yup.object().shape({
            fullName: yup
                .string()
                .required("Tên không được để trống, xin nhập tên."),
            bio: yup
                .string()
                .max(150, "Tiểu sử tối đa 150 ký tự"),
        });

        const handleUpdate = async () => {
            console.log('Hello');
            const formData = new FormData();

            formData.append('avatar', avatar.value)
            formData.append('fullName', fullName.value);
            formData.append('bio', bio.value);
            formData.append('gender', gender.value);
            formData.append('userId', store.state.auth.user._id);

            try {
                const response = await authService.updateAccount(formData);
                if (response.status == 200) {
                    store.dispatch("auth/handleSetUser", response.data)
                }
            } catch (err) {
                console.log(err);
            }
        }

        return {
            handleUpdate,
            editFormSchema,
            fullName,
            gender,
            bio,
            avatar,
            publicImage,
        }
    }
}
</script>
<template>
    <div v-if="this.$store.state.modal.showCreatePostModal" class="fixed z-20">
        <div class="upload_file_modal flex items-center justify-center relative" @click="closeModal">
            <font-awesome-icon icon="fa-solid fa-xmark" class="absolute top-4 right-4 text-white text-2xl cursor-pointer"
                @click="closeModal" />
            <Form class="modal bg-white h-[33rem] rounded-xl" @submit="createPost" autocomplete="off" @click.stop>
                <div class="modal_header text-center py-3 border-b-4 h-[3rem] relative">
                    <span class="font-semibold">Tạo bài viết mới</span>
                    <button type="submit" class="absolute right-3 text-cyan-600 hover:text-cyan-700">Chia sẻ</button>
                </div>
                <div class="h-[30rem]">
                    <div class="flex w-[800px] h-full">
                        <div class="modal_image w-7/12">
                            <div v-if="!images" class="h-full flex flex-col gap-3 items-center justify-center">
                                <font-awesome-icon icon="fa-regular fa-images" class="h-16 w-16 text-gray-500" />
                                <span>Kéo ảnh và video vào đây</span>
                                <label for="images"
                                    class="bg-cyan-500 text-white rounded-xl font-normal px-2 py-2 cursor-pointer hover:bg-cyan-600 hover:-translate-y-2">Chọn
                                    từ máy tính</label>
                                <Field hidden type="file" v-model="images" @change="showImage" name="images" id="images"
                                    multiple="multiple" />

                            </div>
                            <div v-else class="relative h-full rounded-bl-xl bg-cyan-500 ">
                                <div id="showImages" class="h-[80%] w-full grid grid-cols-2 gap-2">
                                </div>
                                <div class="max-w-[80%] absolute right-2 flex gap-2 px-2 py-2 bottom-0">

                                    <label for="images" class="flex mb-5">
                                        <font-awesome-icon icon="fa-solid fa-plus"
                                            class="bg-white rounded-xl p-2 cursor-pointer hover:-translate-y-1" />
                                    </label>
                                    <Field hidden type="file" v-model="images" @change="showImage" name="images" id="images"
                                    multiple="multiple" />
                                </div>
                            </div>
                        </div>
                        <div class="modal_content w-5/12 px-4 ">
                            <div class="flex items-center gap-4 py-4">
                                <img src="../../assets/images/image-login.avif" class="h-8 w-8 rounded-full">
                                <span class="font-bold text-sm outline-1">
                                    {{ this.$store.state.auth.user.fullName }}
                                </span>
                            </div>
                            <div class="h-[10rem]">
                                <Field type="textarea" v-model="content" name="content"
                                    class="w-full h-full resize-none text-black placeholder-gray-500 focus:placeholder-gray-300"
                                    placeholder="Viết chú thích..." />
                            </div>
                            <div>
                                <span>Hahaha</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { Form, Field } from "vee-validate";
import postService from "@/services/post.service";
import socket from "@/plugins/socket";
import { watch } from 'vue';

export default {
    name: "createPost",
    components: {
        Form,
        Field,
    },
    setup() {
        const store = useStore();
        const images = ref();
        const content = ref();

        watch(images, (newValue) => {
            console.log(newValue);
        })

        const closeModal = () => {
            store.dispatch('modal/handleShowCreatePostModal', false);
            images.value = '';
            content.value = '';
        }

        const createPost = async () => {
            try {
                const formData = new FormData();
                if (images.value.length > 0) {
                    images.value.forEach(image =>
                        formData.append('photos', image)
                    );
                };
                formData.append('content', content.value);
                formData.append('owner', store.state.auth.user._id);
                const response = await postService.createPost(formData);
                if (response.status == 201) {
                    socket.emit("createPost", response.data);
                    closeModal();
                }
            } catch (err) {
                console.log(err);
            }
        }

        const showImage = (e) => {
            let divWrap = document.getElementById('showImages');

            const imgs = [];
            for (let i = 0; i < images.value.length; i++) {
                let divImage = document.createElement('div');
                divImage.className = "relative bg-black h-48 w-full";

                let spanEle = document.createElement('span');
                spanEle.className = "absolute text-black text-lg top-1 right-1 font-bold cursor-pointer";
                spanEle.append('x');
                spanEle.addEventListener('click', () => {
                    spanEle.parentElement.remove();
                    images.value.splice(i,1);

                })

                let img = document.createElement('img');
                img.className = 'h-full w-full object-cover';
                img.src = URL.createObjectURL(e.target.files[i]);

                divImage.append(img);
                divImage.append(spanEle);

                divWrap.append(divImage);
            }
        }

        return {
            closeModal,
            createPost,
            showImage,
            images,
            content,
        }
    },
    data() {
        return {
            showCreatePostModal: this.$store.state.modal.showCreatePostModal,
        }
    },
    methods: {
    },
    computed: {
        next() {
            this.selectedImage += 1;
        }
    }
}
</script>

<style>
.carousel {
    height: 100% !important;
    border-bottom-left-radius: 1rem;
}
</style>
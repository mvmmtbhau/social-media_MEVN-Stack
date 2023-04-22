<template>
    <div class="pt-[25px] px-[25px] bg-[#F8F9FC] h-[90%]">
        <div>
            <div class="flex items-center justify-between">
                <h1 class="text-[#5a5c69] text-[28px] leading-[34px] font-normal">
                    Option Report List
                </h1>
                <div id="actions" class="flex gap-1">
                    <span @click="isShowAddModal = true"
                        class="bg-green-500 hover:bg-green-700 h-[32px] rounded-md text-white flex gap-1 items-center justify-center px-3 cursor-pointer">
                        <font-awesome-icon :icon="['fas', 'plus']" /> Thêm mới
                    </span>
                    <div class="border rounded-md">
                        <select v-model="sortBy" class="px-4 text-center bg-[#4E73DF] text-white h-full outline-none">
                            <option value="0">Ngày thêm cũ nhất</option>
                            <option value="1">Ngày thêm mới nhất</option>
                            <option value="2">Tên vị trí A-Z</option>
                            <option value="3">Tên vị trí Z-A</option>
                        </select>
                    </div>
                </div>
            </div>
            <form @submit.prevent="search" class="mt-[25px]">
                <input v-model="searchText" type="text" name="search" autocomplete="off" placeholder="Search room..."
                    class="w-[16rem] py-1 outline-none border rounded-tl-md rounded-bl-md bg-white px-2 text-[14px] leading-[24px]" />
                <button class="bg-[#4E73DF] h-[35px] px-2 cursor-pointer text-white rounded-tr-md rounded-br-md">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </button>
            </form>
            <div class="mt-[25px] h-[21rem]">
                <div class="relative overflow-x-auto border-b shadow-lg rounded-md">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr class="bg-[#4E73DF] text-white text-center">
                                <th scope="col" class="w-10 py-3">
                                    ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Option
                                </th>
                                <th scope="col" class="w-[18rem] py-3">
                                    Quản lý
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(option, index) in options" :key="index" class="bg-white border-b text-center">
                                <td scope="row" class="w-10 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {{ (index + 1) + (5 * (page - 1)) }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ option.text }}
                                </td>
                                <td id="actions" class="flex gap-2 justify-center items-center py-4">
                                    <span @click="showEditModal(option)"
                                        class="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-blue-700">
                                        <font-awesome-icon :icon="['fas', 'pen']" /> Chỉnh sửa
                                    </span>
                                    <span @click="handleDelete(option)"
                                        class="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-red-700">
                                        <font-awesome-icon :icon="['fas', 'trash']" /> Xóa
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-[25px]">
                <v-pagination v-model="page" :length="totalPage"></v-pagination>
            </div>
        </div>
        <div v-if="isShowAddModal" class="fixed z-20">
            <div class="fixed top-0 bottom-0 left-0 right-0 bg-black/[0.6] flex items-center justify-center"
                @click="hiddenAddModal()">
                <div class="bg-white w-[25rem] min-h-[10rem] flex flex-col rounded-[0.6rem]" @click.stop>
                    <div class="flex items-center justify-center border-b py-2 relative">
                        <span class="font-bold">Thêm lựa chọn mới</span>
                        <font-awesome-icon :icon="['fas', 'xmark']" class="absolute right-4 text-xl cursor-pointer"
                            @click="hiddenAddModal()" />
                    </div>
                    <Form :validation-schema="addForm" @submit="handleAdd()" autocomplete="off"
                        class="flex px-10 pt-4 py-6 gap-4">
                        <div class="flex flex-col gap-3 w-full">
                            <div class="flex flex-col w-full gap-2">
                                <label for="option" class=" basis-[50%] text-sm font-semibold">Lựa chọn báo cáo:</label>
                                <div class="basis-[50%]">
                                    <Field v-model="optionText" type="text" name="option" id="option"
                                        class="px-2 py-1 w-full border rounded-md" />
                                    <ErrorMessage name="option" class="error-message" />
                                </div>
                            </div>
                            <div class="flex gap-2 mt-3 justify-center">
                                <button class="bg-green-500 hover:bg-green-600 text-white font-bold px-2 py-1 rounded-md">
                                    Thêm
                                </button>
                                <span @click="hiddenAddModal()"
                                    class="bg-gray-500 hover:bg-gray-600 cursor-pointer px-2 py-1 rounded-md">
                                    Hủy
                                </span>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        <div v-if="isShowEditModal" class="fixed z-20">
            <div class="fixed top-0 bottom-0 left-0 right-0 bg-black/[0.6] flex items-center justify-center"
                @click="hiddenEditModal()">
                <div class="bg-white w-[25rem] min-h-[10rem] flex flex-col rounded-[0.6rem]" @click.stop>
                    <div class="flex items-center justify-center border-b py-2 relative">
                        <span class="font-bold">Chỉnh sửa</span>
                        <font-awesome-icon :icon="['fas', 'xmark']" class="absolute right-4 text-xl cursor-pointer"
                            @click="hiddenEditModal()" />
                    </div>
                    <Form :validation-schema="addForm" @submit="handleUpdate()" autocomplete="off"
                        class="flex px-10 pt-4 py-6 gap-4">
                        <div class="flex flex-col gap-3 w-full">
                            <div class="flex flex-col w-full gap-2">
                                <label for="option" class=" basis-[50%] text-sm font-semibold">Lựa chọn báo cáo:</label>
                                <div class="basis-[50%]">
                                    <Field v-model="optionDetail.text" type="text" name="option" id="option"
                                        class="px-2 py-1 w-full border rounded-md" />
                                    <ErrorMessage name="option" class="error-message" />
                                </div>
                            </div>
                            <div class="flex gap-2 mt-3 justify-center">
                                <button class="bg-green-500 hover:bg-green-600 text-white font-bold px-2 py-1 rounded-md">
                                    Sửa
                                </button>
                                <span @click="hiddenEditModal()"
                                    class="bg-gray-500 hover:bg-gray-600 cursor-pointer px-2 py-1 rounded-md">
                                    Hủy
                                </span>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import { onBeforeMount, ref, watch } from "vue";
import { publicImage } from "@/constants";

import useOptionReport from "@/uses/useOptionReport";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const optionText = ref();
        const searchText = ref('');

        const optionDetail = ref();

        const {
            addNewOption,
            updateOption,
            deleteOption,
            fetchAllOptions,
            options,
            page,
            per_page,
            sortBy,
            totalPage,
        } = useOptionReport();


        const addForm = yup.object().shape({
            option: yup
                .string()
                .required("Xin nhập vào trường này")
        });

        const isShowAddModal = ref(false);
        const isShowEditModal = ref(false);

        const handleAdd = async () => {
            const response = await addNewOption(optionText.value);
            alert(response.data);

            if (response.status == 201) {
                optionText.value = '';
                isShowAddModal.value = false;
                fetchAllOptions(page.value, per_page, sortBy.value, searchText.value);
            }
        }

        const handleUpdate = async () => {
            const response = await updateOption(optionDetail.value);
            alert(response.data);

            if (response.status == 200 || response.status == 404) {
                optionDetail.value = '';
                isShowEditModal.value = false;
            }
        }

        const handleDelete = async (option) => {
            if (confirm(`Bạn muốn xóa ${option.text}?`)) {
                const response = await deleteOption(option._id);
                if (response.status == 200 || response.status == 404) {
                    alert(response.data);
                    page.value = 1;
                    fetchAllOptions(page.value, per_page, sortBy.value, searchText.value);
                }
            }
        }

        const hiddenAddModal = () => {
            if (!optionText.value) isShowAddModal.value = false;

            if (optionText.value && confirm('Có dữ liệu đang nhập, bạn có muốn thoát không?')) {
                optionText.value = '';
                isShowAddModal.value = false;
            }
        }

        const hiddenEditModal = () => {
            if (confirm('Bạn không muốn chỉnh sửa nữa?')) {
                optionDetail.value = ''
                isShowEditModal.value = false;
            }
        }

        const showEditModal = (option) => {
            optionDetail.value = option;
            isShowEditModal.value = true;
        }

        const search = async () => {
            fetchAllOptions(page.value, per_page, sortBy.value, searchText.value);
        }

        onBeforeMount(() => {
            fetchAllOptions(page.value, per_page, sortBy.value, searchText.value);
        })

        watch(page, () => {
            fetchAllOptions(page.value, per_page, sortBy.value, searchText.value);
        })

        watch(sortBy, () => {
            fetchAllOptions(page.value, per_page, sortBy.value, searchText.value);
        })

        return {
            handleAdd,
            handleUpdate,
            handleDelete,
            optionText,
            options,
            hiddenAddModal,
            hiddenEditModal,
            showEditModal,
            search,
            addForm,
            isShowAddModal,
            isShowEditModal,
            page,
            totalPage,
            sortBy,
            searchText,
            optionDetail,
        }
    }
}
</script>
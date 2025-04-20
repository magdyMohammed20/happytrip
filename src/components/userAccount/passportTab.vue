<template>
    <div class="">
        <div class="mt-6 p-3 bg-rose-200 text-3 w-11/12 text-rose-500 custom-border">Add your passport details to make trip hassle
            free</div>
        <div class="lg:md:flex sm:block justify-around">
            <div class=" flex flex-col mt-6">
                <el-input v-model="middleName" placeholder="Passport Number" class="borderBotOnly w-11/14" />
                <el-dropdown @command="handleCommand" max-width="100" class="px-5 py-3 mt-5 border-b-1 border-#9d9d9d custom-border w-11/18">
                    <span class="el-dropdown-link text-#abaeb5">
                        Nationality
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="a">Action 1</el-dropdown-item>
                            <el-dropdown-item command="b">Action 2</el-dropdown-item>
                            <el-dropdown-item command="c">Action 3</el-dropdown-item>
                            <el-dropdown-item command="d" disabled>Action
                                4</el-dropdown-item>
                            <el-dropdown-item command="e" divided>Action
                                5</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-date-picker v-model="date" type="date" placeholder="Expiry Date" class="borderBotOnly mt-4 w-11/18   " />

            </div>
            <div class="mt-6 flex flex-col">
                <el-date-picker v-model="date" type="date" placeholder="Issue Date" class="borderBotOnly  mt-2" />
                <el-date-picker v-model="date" type="date" placeholder="Date of Birth" class="borderBotOnly  mt-4" />
                <el-button size="large" class="bg-#1CCF3D my-10 sm:w-11/14 text-white font-bold shadow-xl px-15">
                    Save Changes</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'first',
            date: "",
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log("dbufru", tab, event);
        },
    }
}
</script>
<style scoped>
.jojo{
    display: flex;
    flex-direction: column ;
}
</style>
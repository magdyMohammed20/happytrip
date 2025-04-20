<template>

    <div>
        <div class="flex sm:flex-col lg:md:inline-block">
            <el-tag class="py-4 custom-border sm:contents lg:md:inline-flex" effect="plain" round>
                <span class="i-mdi-plus-circle text-xl"></span>
                <span class="m-2">Add Documents</span>
            </el-tag>

            <el-tag class="mx-1 py-4 custom-border sm:contents lg:md:inline-flex" effect="plain" round>
                <span class="i-mdi-plus-circle text-xl"></span>
                <span class="m-2">Add Flight Preference</span>
            </el-tag>

            <el-tag class="mx-1 py-4 custom-border sm:contents lg:md:inline-flex" effect="plain" round>
                <span class="i-mdi-plus-circle text-xl"></span>
                <span class="m-2">Add Accomodation Preferences</span>

            </el-tag>
            <el-button class="bg-#8612ea text-white py-1  px-8 my-4 sm:w-1/3 lg:w-1/6   ">
                Edit
            </el-button>
        </div>

        <div class="py-2 custom-border my-4 bg-slate-100 lg:md:flex sm:contents justify-around">
            <p>Unique ID: 2999214</p>
            <p>Email: Info@email.com</p>
            <p>Phone: 253295232</p>
        </div>
        <div class="border-b-1 border-slate-200">
            <p class="lg:md:text-xl  font-bold">Documents ( Mohamed Ali )</p>
            <p class="text-xs text-slate-500 sm:w-11/12 lg:md:w-1/2 py-3">The details of the documents will be saved and
                secured, Add your
                passport details to make faster booking</p>
        </div>
        <div>
            <el-tabs v-model="activeName" class="demo-tabs account-tabs" @tab-click="handleClick">
                <el-tab-pane label="Passport" name="first">
                    <passport-tab></passport-tab>
                </el-tab-pane>
                <el-tab-pane label="National Id" name="second">Natioanl Id</el-tab-pane>
                <el-tab-pane label="Iqama Id" name="third">Iqama Id</el-tab-pane>
            </el-tabs>
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

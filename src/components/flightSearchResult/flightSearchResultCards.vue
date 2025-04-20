<template>
    <el-col :span="24" :lg="15" :md="15" :sm="24" class="lg:md:px-10 sm:px-2 lg:md:mx-10 sm:mx-2">
        <div>
            <p class="font-bold pt-5 mt-1 text-basic px-1">
                300 Flight Search Result
            </p>
        </div>
        <el-card v-for="card in 5" :body-style="{ padding: '0px' }" class="my-5">
            <template #header>
                <div class="card-header justify-between p-1 m-0 custom-header flex">
                    <div>
                        <img src="../../../src/assets/images/icon.png" class="image w-8\6 p-1" />
                        <p class="inline relative top--3 font-bold mx-3">Ukraine Intl Airlines</p>
                    </div>
                    <div>
                        <p class="inline font-bold text-pink-500 relative top-3 text-xs m-3">SAR 1,200,33</p>
                    </div>
                </div>
            </template>
            <div class="flex lg:md:justify-between sm:justify-around sm:flex-col px-5 lg:md:flex-row py-3">
                <div
                    class="lg:md:border-r-1 lg:md:border-t-0 lg:md:border-l-0 lg:md:border-b-0 sm:border-b-1 sm:border-t-0 sm:border-l-0 sm:border-r-0 lg:md:border-dashed sm:border-dashed lg:md:border-slate-400 sm:border-slate-400 lg:md:w-90 sm:w-full">
                    <div>
                        <P class="font-bold text-sm">London <span class="i-mdi-arrow-right"></span>
                            Dubai Apr. 11 ,2019 </P>
                    </div>

                    <div class="flex ">
                        <div class="px-2">
                            <span class="i-mdi-airplane text-green-500"></span>
                            <span class="text-slate-400 text-xs font-light px-2">TAKE OFF</span>
                            <p class="text-xl mb-0 font-light ">12:20</p>
                            <p class="text-slate-400 mt-0 text-xs font-light">London</p>
                        </div>
                        <div class="px-2">
                            <span class="i-mdi-airplane rotate-90 text-pink-500"></span>
                            <span class="text-slate-400 text-xs font-light px-2">LANDING</span>
                            <p class="text-xl mb-0 font-light ">12:20</p>
                            <p class="text-slate-400 mt-0 text-xs font-light">London</p>
                        </div>
                        <div class="px-2">
                            <span class="i-mdi-clock-outline rotate-90 text-yellow-500"></span>
                            <span class="text-slate-400 text-xs font-light px-2">DURATION</span>
                            <p
                                class="text-sm bg-purple-200 text-center text-purple-800 rounded-3 py-1 px-0 w-15 mt-6 font-light ">
                                1 stop</p>
                        </div>
                    </div>

                </div>
                <div>
                    <div>
                        <P class="font-bold text-sm">London <span class="i-mdi-arrow-right"></span>
                            Dubai Apr. 11 ,2019 </P>
                    </div>

                    <div class="flex ">
                        <div class="px-2">
                            <span class="i-mdi-airplane text-green-500"></span>
                            <span class="text-slate-400 text-xs font-light px-2">TAKE OFF</span>
                            <p class="text-xl mb-0 font-light ">12:20</p>
                            <p class="text-slate-400 mt-0 text-xs font-light">London</p>
                        </div>
                        <div class="px-2">
                            <span class="i-mdi-airplane rotate-90 text-pink-500"></span>
                            <span class="text-slate-400 text-xs font-light px-2">LANDING</span>
                            <p class="text-xl mb-0 font-light ">12:20</p>
                            <p class="text-slate-400 mt-0 text-xs font-light">London</p>
                        </div>
                        <div class="px-2">
                            <span class="i-mdi-clock-outline rotate-90 text-yellow-500"></span>
                            <span class="text-slate-400 text-xs font-light px-2">DURATION</span>
                            <p
                                class="text-sm bg-purple-200 text-center text-purple-800 rounded-3 py-1 px-0 w-15 mt-6 font-light ">
                                1 stop</p>
                        </div>
                    </div>
                </div>
                <div class="self-end">
                    <!-- <p></p> -->
                    <el-button size="large" class="bg-#1CCF3D my-5 text-white font-bold shadow-xl">
                        Book Now</el-button>
                </div>
            </div>
        </el-card>
    </el-col>
</template>
<script>
export default {
    data() {
        return {
            value: 5
        }
    }
}
</script>
<style lang="scss">


div:has(.custom-header) {
    padding: 0 !important;
}
</style>

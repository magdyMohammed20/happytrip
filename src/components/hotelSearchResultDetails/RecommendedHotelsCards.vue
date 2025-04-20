<template>
            <h3 class=" font-extrabold">Recommended Hotels</h3>
            <!-- <h1>{{ screenType }}</h1> -->
        <el-carousel :interval="4000" :type="screenType" height="500px" class="w-full">
            <el-carousel-item v-for="item in 6" :key="item" >
                <el-col class="para-filter flex">
                    <el-card class="rounded-3 flex justify-center m-auto items-center w-fit " :body-style="{
                        padding: '0',
                    }">
                        <div class="relative border-white border-12 border-solid">
                            <img src="@/assets/images/deals1.png " alt="deal" class="basis-full rounded-2xl" />
                            <div class="absolute top-2 p-2 mx-2 px-3  bg-yellow rounded-full text-xs custom-extra-bold">
                                15%
                                <br /> OFF
                            </div>
                            <div
                                class="absolute bottom-1 right-0 p-2 px-4 rounded-tl-3xl bg-white-/90 text-sm custom-extra-bold text-#FF1E74">
                                SAR <br /> 195.00</div>
                        </div>
                        <div class="text-[13px] px-3">
                            <p class="font-extrabold mt-0">Winter beach escapes 30% off</p>
                            <span class="i-mdi-map-marker-radius-outline text-3xl text-violet-800"></span>
                            <span class="text-xs px-3 text-slate-500">Jumeirah P.O. Box 75157 , UAE</span>
                            <div class="py-2">
                                <el-button class="button font-bold text-purple-800 text-xs bg-violet-100">View on Map
                                </el-button>
                                <el-rate class="p-1 py-2" v-model="value" size="large" disabled text-color="#ff9900" />
                            </div>
                            <div class="py-3">
                                <span class="i-mdi-wifi text-3xl h-5  text-purple-800"></span>
                                <span class="i-mdi-pool text-3xl h-5  text-purple-800"></span>
                                <span class="i-mdi-cup text-3xl h-5  text-purple-800"></span>
                            </div>
                            <el-button text class="button custom-button font-bold px-18 py-5 mb-5 mt-1">Select
                                Room</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-carousel-item>

        </el-carousel>
</template>
<script>
export default{
    data(){
        return{
            screenType:''
        }
    },
    mounted(){
        window.screen.width < 600 ? this.screenType = '' : this.screenType ='card'
    },
}
</script>
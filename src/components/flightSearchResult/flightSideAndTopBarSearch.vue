<template>
    <el-col :span="24" :lg="24" :md="24">
        <el-card class="box-card lg:px-20 sm:md:px-3">
            <div class="flex justify-between">
                <div class="flex">
                    <div class="bg-pink-400 inline h-10 w-10 rounded-full">
                        <span class="i-mdi-plane mt-4 m-auto rotate--43 text-4xl text-white"></span>
                    </div>
                    <div class="inline px-3">
                        <p class="mt-0 mb-0 font-thin">SEARCH SUMMERY</p>
                        <P class="font-bold  mb-0 mt-0">London <span class="i-mdi-arrow-right"></span>
                            Dubai </P>
                        <span class="text-xs font-bold mt-0 mb-0 text-slate-500"> 1 Traveller , Economy</span>

                    </div>
                </div>
                <div>
                    <el-button type="success" class="px-10 my-5 text-xs font-bold">Modify</el-button>
                </div>

            </div>
        </el-card>
    </el-col>
    <el-col :span="24" :lg="6" :md="6">
        <el-card class="box-card side-card  pl-15">
            <div class="sm:block lg:md:hidden ">
                <p class="inline text-sm text-slate-400">Filters</p>
            </div>

            <div class="flex flex-col py-5">
                <p class="font-bold text-md">Search by Stops</p>
                <el-checkbox v-model="checked1" label="None Stop" class="check-box-color" size="large" />
                <el-checkbox v-model="checked2" label="1 Stop" class="check-box-color" size="large" />
                <el-checkbox v-model="checked3" label="1+ Stop" class="check-box-color" size="large" />
            </div>

            <div class="flex flex-col py-5">
                <p class="font-bold text-md">Search by Departure Time</p>
                <div class="flex justify-between">
                    <el-checkbox v-model="checked1" label="[00-06] Early Morning" class="check-box-color"
                        size="large" />
                    <p class="text-xs text-slate-400">- - - </p>
                </div>
                <div class="flex justify-between">
                    <el-checkbox v-model="checked1" label="[06-12] Morning" class="check-box-color" size="large" />
                    <p class="text-sm font-light text-slate-400">SAR 1,200,4</p>
                </div>
                <div class="flex justify-between">
                    <el-checkbox v-model="checked1" label="[12-06] Day" class="check-box-color" size="large" />
                    <p class="text-sm font-light text-slate-400">SAR 1,200,4</p>

                </div>
                <div class="flex justify-between">
                    <el-checkbox v-model="checked1" label="[06-12] Night" class="check-box-color" size="large" />
                    <p class="text-sm font-light text-slate-400">SAR 1,200,4</p>

                </div>
            </div>
            <div class="flex flex-col py-5">
                <p class="font-bold text-md">Search by Fare Type</p>
                <el-checkbox v-model="checked1" label="Refundable" class="check-box-color" size="large" />
                <el-checkbox v-model="checked2" label="None Refundable" class="check-box-color" size="large" />
            </div>
            <div class="slider-demo-block w-50 mx-auto py-5">
                <p class="font-bold text-md">Search by Price</p>

                <el-slider v-model="value" @input="formatePriceRange(value)" :show-tooltip="false" :min="min" :max="max"
                    range />
                <div class="flex justify-between">
                    <p class="inline text-xs text-slate-400">{{ first }}</p>
                    <p class="inline text-xs text-slate-400">{{ last }}</p>
                </div>

            </div>
            <div class="flex flex-col py-5">
                <p class="font-bold text-md">Search by Airlines</p>

                <el-checkbox v-model="checked1" label="Multi Airline Itinerary" class="check-box-color" size="large" />
                <el-checkbox v-model="checked2" label="Aeroflot" class="check-box-color" size="large" />
                <el-checkbox v-model="checked3" label="Air France" class="check-box-color" size="large" />
                <el-checkbox v-model="checked4" label="British Airways" class="check-box-color" size="large" />
                <el-checkbox v-model="checked5" label="Egyptair" class="check-box-color" size="large" />
                <el-checkbox v-model="checked6" label="Emirates" class="check-box-color" size="large" />
                <el-checkbox v-model="checked7" label="Etihad Airways" class="check-box-color" size="large" />
                <el-checkbox v-model="checked8" label="Klm Royal Dutch Airlines" class="check-box-color" size="large" />
                <el-checkbox v-model="checked9" label="Lufthansa" class="check-box-color" size="large" />
                <el-checkbox v-model="checked10" label="Middle East Airlines" class="check-box-color" size="large" />
            </div>
        </el-card>
    </el-col>

</template>
<script>
export default {
    data() {
        return {
            activeName: [],
            value: 0,
            min: 15,
            max: 100,
            prices: [],
            first: 0,
            last: 0,
            star: 3,
            pool: true,
            wifi: false,
            checked1: true,
            checked2: true,

        }
    },
    methods: {
        formatePriceRange(value) {
            this.first = value[0] + " " + "SAR"
            this.last = value[1] + " " + "SAR"
            return this.first
        },
        handleChange: (val) => {
            console.log(val)
        }

    },
    computed: {

    }
}
</script>
<style>
.el-collapse {
    border-top-color: transparent;
}

.side-card {
    border-top: none !important;
    box-shadow: none;
    border-radius: 0px;
}

.checkbox-input>.el-checkbox__input {
    display: none !important;

}

/* .el-checkbox__input {
} */

.el-checkbox.is-bordered.is-checked {
    border: 3px solid #5808d8;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 5px !important;

}

.el-checkbox.is-bordered.is-checked,
.el-checkbox.is-bordered.el-checkbox--large {
    padding: 11%;
}

.rounded-style {
    width: 40px;
    height: 40px;
    display: inline-block;
    text-align: center;
    margin: auto;
}

.rounded-style2 {
    width: 40px;
    /* height: 40px; */
    display: inline-block;
    text-align: center;
    margin: auto;
}

.check-box-color>.el-checkbox__input.is-checked>.el-checkbox__inner {
    background-color: #000000 !important;
}

.check-box-color>.el-checkbox__label {
    color: #000000 !important;
}

.last-item>div>div,
.last-item>.el-collapse-item__wrap {
    border-bottom: 0px solid;
}

.el-card.is-always-shadow {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
}

.title-collapse>div>div {
    font-weight: 800;
    color: #000000 !important;
}
</style>
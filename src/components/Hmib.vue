<script lang="ts">
import {
    defineComponent,
    computed,
    watch,
    onMounted,
    ref,
    onBeforeUnmount,
} from "vue";

import * as TWEEN from "@tweenjs/tween.js";

export default defineComponent({
    name: "hmib",
    props: {
        player: Object,
    },
    setup(props, { emit }) {
        let nowType = ref("");
        let topicNum = ref(0);

        let topic = ref((window as any).topic);
        let showMenu = ref(false);
        let waitPageShow = ref(false)
        let questionPageShow = ref(false)
        // let showHelp = ref(true)
        // let showlr = ref(false)
        let dianjiswtich = ref(false)
        let zishouSwitch = ref(false);

        let animateSwitch = ref(false);


        function goBack() {
            console.log("goBack");
            emit("back");
        }
        const changeNum = (num: number): void => {
            topicNum.value = num
        }
        let player: any = (window as any).player;
        let j1: any = player.scene.getObjectByName("j1");
        let j2: any = player.scene.getObjectByName("j2");
        let j3: any = player.scene.getObjectByName("j3");
        let j4: any = player.scene.getObjectByName("j4");
        let j5: any = player.scene.getObjectByName("j5");
        let j6: any = player.scene.getObjectByName("j6");

        let j61: any = player.scene.getObjectByName("j6-1");
        let j66: any = player.scene.getObjectByName("j6-6");





        // let j63: any = player.scene.getObjectByName("j6-3");

        // let j63: any = player.scene.getObjectByName("j6-3");



        // debugger
        onMounted(() => {
            topicNum.value++
            emit("changeTopicNum", topicNum.value);
        });



        const topicOneImg = computed(() => {
            console.log(topicNum.value);
            switch (topicNum.value) {
                case 2:
                    return `background-image: url( "./hmib/a1.png"  )`;
                    break;
                case 3:
                    return `background-image: url( "./hmib/a2.png"  )`;
                    break;
                case 4:
                    return `background-image: url( "./hmib/a3.png"  )`;
                    break;
                case 5:
                    return `background-image: url( "./hmib/a4.png"  )`;
                    break;


            }
        });

        function getRobotPosition() {
            let arr = [];
            arr = [
                j1.rotation.z.toFixed(2),
                j2.rotation.x.toFixed(2),
                j3.rotation.x.toFixed(2),
                j4.rotation.y.toFixed(2),
                j5.rotation.x.toFixed(2),
                j6.rotation.y.toFixed(2),
            ];
            console.log(arr)
            return arr;
        }
        (window as any).getRobotPosition = getRobotPosition


        function setState(arr: Array<number>) {
            j1.rotation.z = arr[0];
            j2.rotation.x = arr[1];
            j3.rotation.x = arr[2];
            j4.rotation.y = arr[3];
            j5.rotation.x = arr[4];
            j6.rotation.y = arr[5];
            player.renderer.render(player.scene, player.camera);
        }
        function animateState(
            arr: Array<number>,
            during: number,
            complete?: Function
        ) {
            new TWEEN.Tween(j1.rotation)
                .to({ z: arr[0] }, during)
                .easing(TWEEN.Easing.Linear.None)
                .start();
            new TWEEN.Tween(j2.rotation)
                .to({ x: arr[1] }, during)
                .easing(TWEEN.Easing.Linear.None)
                .start();
            new TWEEN.Tween(j3.rotation)
                .to({ x: arr[2] }, during)
                .easing(TWEEN.Easing.Linear.None)
                .start();
            new TWEEN.Tween(j4.rotation)
                .to({ y: arr[3] }, during)
                .easing(TWEEN.Easing.Linear.None)
                .start();
            new TWEEN.Tween(j5.rotation)
                .to({ x: arr[4] }, during)
                .easing(TWEEN.Easing.Linear.None)
                .start();
            new TWEEN.Tween(j6.rotation)
                .to({ y: arr[5] }, during)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(() => {
                    if (complete) complete()
                })
                .start();
        }





        // 初始化位置视角
        function startFree(arr?: Array<number>, posObj?: Object, conObj?: Object): void {

            // j65.visible = true
            // setLeftContent('操作机器人')
            if (arr) animateState(arr, 2000)

            if (posObj) {
                new TWEEN.Tween(player.camera.position)
                    .to(posObj, 2000)
                    .easing(TWEEN.Easing.Linear.None)
                    .start();
            }
            if (conObj) {
                new TWEEN.Tween(player.controls.target)
                    .to(conObj, 2000)
                    .easing(TWEEN.Easing.Linear.None)
                    .start();
            }



        }


        let actionNum = 0

        //打磨
        let lun1: any = player.scene.getObjectByName("lun1");
        let j64: any = player.scene.getObjectByName("j6-4");

        let tjArr: any = [[-0.99, 0.03, -0, 0, -0, 0], [-0.97, 0.57, -0.17, 0, 1.11, 0], [-0.96, 0.69, -0.13, 0, 0.95, -0.045]]
        let gzArr: any = [[-0.26, 0.43, 0.34, -0.02, 0.73, 0.05], [-0.235, 0.425, 0.34, -0.02, 0.73, 0.05], [-0.20, 0.42, 0.35, -0.02, 0.73, 0.05], [-0.18, 0.42, 0.36, -0.02, 0.73, 0.05]]
        let bgzArr: any = [
            [-0.13, 0.51, 0.21, -0.02, 0.73, 0.05], [-0.14, 0.505, 0.19, -0.02, 0.73, 0.05], [-0.16, 0.51, 0.18, -0.02, 0.73, 0.05], [-0.17, 0.51, 0.18, -0.02, 0.73, 0.05],
            [-0.18, 0.505, 0.18, -0.02, 0.73, 0.05], [-0.19, 0.505, 0.18, -0.02, 0.73, 0.05], [-0.20, 0.515, 0.17, -0.02, 0.73, 0.05], [-0.21, 0.51, 0.16, -0.02, 0.73, 0.05]
        ]

        function tujiao() {

            switch (actionNum) {
                //拾取
                case 0:
                    animateState(tjArr[0], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 1:
                    animateState(tjArr[1], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 2:
                    animateState(tjArr[2], 1000, () => {
                        actionNum++
                        j61.visible = true
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 3:
                    animateState(tjArr[1], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                // 规则
                case 4:
                    animateState(gzArr[0], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 5:
                    animateState(gzArr[1], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 6:
                    animateState(gzArr[2], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 7:
                    animateState(gzArr[3], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                // 不规则
                case 8:
                    animateState(bgzArr[0], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 9:
                    animateState(bgzArr[1], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 10:
                    animateState(bgzArr[2], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 11:
                    animateState(bgzArr[3], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 12:
                    animateState(bgzArr[4], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 13:
                    animateState(bgzArr[5], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 14:
                    animateState(bgzArr[6], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 15:
                    animateState(bgzArr[7], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 16:
                    animateState(tjArr[0], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 17:
                    animateState(tjArr[1], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            tujiao()
                        }, 1000)
                    }); break;
                case 18:
                    animateState(tjArr[2], 1000, () => {
                        actionNum = 0
                        j61.visible = false
                        setTimeout(() => {

                        }, 1000)
                    }); break;


            }

        }

        // 码垛
        let j62: any = player.scene.getObjectByName("j6-2");
        let maduo: any = player.scene.getObjectByName("maduo");
        let Group031: any = player.scene.getObjectByName("Group031")
        let maduoGroup1: any = player.scene.getObjectByName("maduoGroup1")
        let maduoGroup2: any = player.scene.getObjectByName("maduoGroup2")

        let mdarr = [[-1.04, 0.20, -0.17, 0, 1.07, 0], [-1.04, 0.49, -0.05, 0, 1.07, 0], [-1.04, 0.61, 0.02, 0, 0.86, 0]]
        //三花
        let sanarr = [[-0.28, 0.49, -0.05, 0, 1.07, 0], [-0.16, 0.76, -0.45, 0, 1.07, 0], [-0.02, 0.52, -0.11, 0, 1.07, 0], [0.70, 0.68, -0.20, 0.03, 1.06, -0.04]]
        //四花
        let siarr = [[0.57, 0.53, -0.26, 0, 1.07, 0], [0.56, 0.61, 0.15, 0.52, 0.04, 0], [0.57, 0.53, -0.26, 0, 1.07, 0], [0.70, 0.68, -0.20, 0.03, 1.06, -0.04]]

        function maduoa() {

            switch (actionNum) {
                //拾取
                case 0:
                    animateState(mdarr[0], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            maduoa()
                        }, 1000)
                    }); break;
                case 1:
                    animateState(mdarr[0], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            maduoa()
                        }, 1000)
                    }); break;
                case 2:
                    animateState(mdarr[0], 1000, () => {
                        actionNum++
                        j62.visible = true
                        Group031.visible = false
                        setTimeout(() => {
                            maduoa()
                        }, 1000)
                    }); break;

                // 三花
                case 3:
                    animateState(sanarr[0], 1000, () => {
                        actionNum++
                         maduoGroup1.visible = false
                        setTimeout(() => {
                            maduoa()
                        }, 1000)
                    }); break;
                case 4:
                    animateState(sanarr[0], 1000, () => {
                        actionNum++
                        maduo.visible = true
                        setTimeout(() => {
                            maduoa()
                        }, 1000)
                    }); break;
                case 5:
                    animateState(sanarr[0], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            maduoa()
                        }, 1000)
                    }); break;
                case 6:
                    animateState(sanarr[0], 1000, () => {
                        actionNum++
                        maduo.visible = false
                         maduoGroup1.visible = true
                        setTimeout(() => {
                            maduoa()
                        }, 1000)
                    }); break;

                // 四花
                case 7:
                    animateState(siarr[0], 1000, () => {
                        actionNum++
                        maduoGroup2.visible = false
                        setTimeout(() => {
                            maduoa()
                        }, 1000)
                    }); break;
                case 8:
                    animateState(siarr[0], 1000, () => {
                        actionNum++
                        maduo.visible = true
                        setTimeout(() => {
                            maduoa()
                        }, 1000)
                    }); break;
                case 9:
                    animateState(siarr[0], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            maduoa()
                        }, 1000)
                    }); break;
                case 10:
                    animateState(siarr[0], 1000, () => {
                        actionNum++
                         maduo.visible = false
                         maduoGroup2.visible = true
                        setTimeout(() => {
                            maduoa()
                        }, 1000)
                    }); break;
                //释放
                case 11:
                    animateState(mdarr[0], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            maduoa()
                        }, 1000)
                    }); break;
                case 12:
                    animateState(mdarr[0], 1000, () => {
                        actionNum++
                        setTimeout(() => {
                            maduoa()
                        }, 1000)
                    }); break;
                case 13:
                    animateState(mdarr[0], 1000, () => {
                        actionNum = 0
                        j62.visible = false
                        Group031.visible = true
                        
                    }); break;
            }
        }
        function stopTween(type: boolean) {
            if (type) {
                actionNum = 0
            }
            TWEEN.removeAll()
        }


        watch(topicNum, () => {
            console.log("topicNum", topicNum.value);
            emit("changeTopicNum", topicNum.value);

            if (topicNum.value === 2) {
            }

            if (topicNum.value === 4) {


            }

        });


        onBeforeUnmount(() => {
        });
        return {
            topic,
            // goTest,
            goBack,
            topicOneImg,
            topicNum,
            nowType,
            animateSwitch,
            showMenu,
            zishouSwitch,
            waitPageShow,
            questionPageShow,
            // showHelp,
            // showlr,
            dianjiswtich,
            changeNum,
            stopTween,
            tujiao,
            maduoa
        };
    },
});
</script>

<template>
    <div class="controls_box">
        <div class="left_box" v-if="topicNum < 10">
            <!-- scara机器人调试实训任务 -->
            <div class="robot_opt" :style="topicOneImg">
                <div class="otherpage" v-if="topicNum === 1">
                    <div
                        class="dianjideng"
                        :class="{ liang: dianjiswtich }"
                        @click="dianjiswtich = !dianjiswtich"
                    >
                        <div class="text">电机灯</div>
                    </div>
                    <div class="kaiguan">
                        <div class="off">off</div>
                        <div class="on active">on</div>
                        <div class="text">电源开关</div>
                    </div>
                    <div class="tie">
                        <div
                            class="hand"
                            :class="{
                                shou: !zishouSwitch,
                                zi: zishouSwitch,
                            }"
                            @click="zishouSwitch = !zishouSwitch"
                        ></div>
                    </div>
                </div>

                <!-- <div class="btn_page" v-if="topicNum === 2"> -->
                <!-- <div
                        class="typeBtn"
                        style="left: 119px;top: 170px;"
                        @click="gongzuozhan('zuo')"
                    >向左</div>
                    <div
                        class="typeBtn"
                        style="left: 213px;top: 170px;"
                        @click="gongzuozhan('you')"
                >向右</div>-->
                <!-- <div class="conBtn" style="left: 305px;top: 72px;" @click="gongzuozhan('on')"></div>
                    <div class="conBtn" style="left: 305px;top: 124px;" @click="gongzuozhan('off')"></div>
                <div class="conBtn" style="left: 305px;top: 174px;" @click="gongzuozhan('ofn')"></div>-->
                <!-- </div> -->

                <div class="btn_page" v-if="topicNum === 2">
                    <!-- <div class="typeBtn" style="left: 319px;top: 287px;"></div> -->
                    <div class="conBtn" style="left: 306px;top: 73px;" @click="tujiao()"></div>
                    <div class="conBtn" style="left: 306px;top: 123px;" @click="stopTween(false)"></div>
                    <div class="conBtn" style="left: 334px;top: 173px;" @click="stopTween(true)"></div>
                </div>

                <div class="btn_page" v-if="topicNum === 3">
                    <!-- <div class="typeBtn" style="left: 319px;top: 287px;"></div> -->
                    <div class="conBtn" style="left: 306px;top: 73px;" @click="maduoa()"></div>
                    <div class="conBtn" style="left: 306px;top: 123px;" @click="stopTween(false)"></div>
                    <div class="conBtn" style="left: 334px;top: 173px;" @click="stopTween(true)"></div>
                </div>
            </div>
        </div>
        <div class="overbtn" v-if="[1, 2, 3, 4, 5].includes(topicNum)" @click="topicNum++">下一步</div>
        <div class="overbtn" v-if="topicNum === 6" @click="goBack">实训结束</div>
    </div>
</template>

<style scoped lang="less">
.controls_box {
    position: absolute;
    right: 47px;
    bottom: 119px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    .overbtn {
        right: 840px;
        bottom: -60px;
        position: absolute;
        width: 200px;
        height: 45px;
        margin: 20px auto 0;
        font-size: 18px;
        text-align: center;
        line-height: 45px;
        border-radius: 25px;
        color: #fff;
        cursor: pointer;
        background-color: #ffaf4c;
    }

    .startb {
        left: -1000px;
        top: 0;
        position: absolute;
        width: 200px;
        height: 45px;
        margin: 20px auto 0;
        font-size: 18px;
        text-align: center;
        line-height: 45px;
        border-radius: 25px;
        color: #fff;
        cursor: pointer;
        background-color: #ffaf4c;
    }

    .left_box {
        width: 440px;
        height: 320px;
        /* float: left; */
        position: relative;
        top: 14px;
        border: 4px solid #666;

        .robot_opt {
            background: no-repeat;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background-size: 100% 100%;
            background-color: #fff;

            .otherpage {
                position: absolute;
                width: 74%;
                height: 100%;
                top: 0;
                right: 0;
                /* border: 2px solid #000; */
                /* background-color: #fff; */

                .dianjideng {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    top: 37px;
                    left: 20px;
                    border-radius: 50%;
                    cursor: pointer;
                    background-color: #ccc;

                    .text {
                        position: absolute;
                        top: -26px;
                        font-size: 14px;
                        text-align: center;
                        width: 100%;
                    }
                }
                .liang {
                    background-color: #ffb100;
                }
                @keyframes blink {
                    0% {
                        background-color: #ccc;
                    }
                    50% {
                        background-color: #ffb100;
                    }
                    100% {
                        background-color: #ccc;
                    }
                }

                .shan {
                    animation: blink 0.5s linear infinite;
                }

                .kaiguan {
                    position: absolute;
                    width: 136px;
                    height: 80px;
                    top: 10px;
                    left: 90px;
                    border: 1px solid #ffb100;

                    .off {
                        position: absolute;
                        left: 10px;
                        top: 25px;
                        width: 50px;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        color: #fff;
                        background-color: #ccc;
                        cursor: pointer;
                    }
                    .on {
                        position: absolute;
                        left: 75px;
                        top: 25px;
                        width: 50px;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        color: #fff;
                        background-color: #ccc;
                        cursor: pointer;
                    }
                    .active {
                        background-color: #ff7000a9;
                    }
                    .text {
                        position: absolute;
                        font-size: 14px;
                        top: 0;
                        left: 0;
                        width: 100%;
                        text-align: center;
                    }
                }
                .tie {
                    position: absolute;
                    width: 220px;
                    height: 210px;
                    top: 100px;
                    left: 10px;
                    background: url(../topic0/tie.png) no-repeat;
                    background-size: 100% 100%;

                    .hand {
                        position: absolute;
                        width: 60px;
                        height: 60px;
                        top: 80px;
                        left: 76px;
                        background: url(../topic0/pointhand.png) no-repeat;
                        background-size: 100% 100%;
                        transform: rotateZ(-38deg);
                    }
                    .shou {
                        transform: rotateZ(0);
                    }
                    .zi {
                        transform: rotateZ(-72deg);
                    }
                }
            }

            .btn_page {
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: #ffffff33;

                .typeBtn {
                    width: 43px;
                    height: 25px;
                    line-height: 25px;
                    text-align: center;
                    color: #fff;
                    background-color: #ffaf4c;
                    position: absolute;
                    border-radius: 25px;
                    cursor: pointer;
                }

                .conBtn {
                    width: 43px;
                    height: 39px;
                    position: absolute;
                    border-radius: 25px;
                    cursor: pointer;
                }
            }

            .nextb {
                width: 144px;
                height: 35px;
                line-height: 35px;
                position: absolute;
                margin: 20px auto 0;
                font-size: 18px;
                text-align: center;
                border-radius: 25px;
                color: #fff;
                cursor: pointer;
                background-color: #ffaf4c;
            }
        }
    }
}
</style>

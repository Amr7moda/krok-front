import Image from "next/image";
import sliderImage from "../../../../public/sliderImage2.svg";
import arrowDown from "../../../../public/arrowdown2.svg";
import homeBackground from "../../../../public/home_background.svg";
import actionButton from "../../../../public/Button Primary Color.svg";
import actionButton2 from "../../../../public/Button Primary Color2.svg";
import homeImg from "../../../../public/home_img.svg";
import logo from "../../../../public/logo.svg";
import TopBar from "@/pages/components/Home/TopBar";
import SearchBar from "@/pages/components/Home/SearchBar";
import {useState} from "react";
import notificationsIcon from "../../../../public/🦆 icon _bell notification_.svg";

import HomeFAQs from "@/pages/components/Home/HomeFAQs";
import {useRouter} from "next/router";
import NavBar from "@/pages/components/NavBar";
import FlowingIcons from "@/pages/components/utils/FlowingIcons";
import SectionsHeader from "@/pages/components/SectionsHeader";
import VideoPlayer from "@/pages/components/utils/VideoPlayer";
import {useTranslation} from 'react-i18next';
import userIcon from "../../../../public/profile.svg";
import {useAuth} from "@/context/AuthContext";
import NavbarContainer from "../NavbarContainer";


function HomeSlider({onClick}) {
    return <div onClick={onClick} id={`home-slider`} className={`w-full h-fit px-[0px] mt-4`}>
        <Image  src={sliderImage} width={750} height={650} className="w-full mb-0" alt={``}/>
    </div>;
}


function HomePage() {
    const router = useRouter();
    const {t, i18n} = useTranslation("common");

    function handleStart() {
      if(token){
        router.push('/start')
      }else{
        router.push('/signin')
      }
    }

    const actionBtn = i18n.language === "en" ? actionButton : actionButton2;
    const {token, user} = useAuth();
    let userProfilePhoto = userIcon;
    if (user) {
        userProfilePhoto = user.profile_photo?.toString().length <= 50 ? userIcon : user.profile_photo;
    }
    const style = {
      background: `linear-gradient(
        to right,
    #4EAACA 40.7%,
    #4E9ED1 72.97%,
    #4EACC9 81.56%,
    #4DB9C1 91.47%,
    #4DD4B2 100%
      )`
    }
    return (
      <div id={`home-container`} className={`w-full h-full`}>
        <div className="w-full h-fit flex flex-col items-center justify-center bg-[url('/home_background.svg')] bg-cover">
          <div className="w-full h-fit block  relative">
            <NavbarContainer/>
            <div className="w-full h-full grid grid-cols-3 lg:grid-cols-1 items-end justify-center">
              <div className="h-full col-span-2 lg:col-span-1 flex flex-col items-center justify-center w-full z-2">
                <div
                  className={`w-full px-28 lg:px-8 h-full flex flex-col justify-between pb-28 pt-6`}
                >
                  <div
                    style={{ fontWeight: "700", fontFamily: "Calibri" }}
                    className={`responsive-font text-white text-opacity-40 font-extrabold`}
                  >
                    KROK PLUS
                    <div className="border-t border-2 border-white border-opacity-25 mb-8"></div>
                  </div>

                  <div
                    style={{ fontFamily: "Calibri" }}
                    className={`sm-responsive-font text-white font-bold text-5xl`}
                  >
                    {t("GetMotivatedInMinutes")}
                  </div>
                  <div
                    style={{ fontFamily: "Calibri", lineHeight: "50px" }}
                    className={`xs-responsive-font text-white mt-4 font-semibold text-4xl`}
                  >
                    “{t("TheEarlier")}.”
                  </div>
                  <div className={`text-white font-base text-2xl mt-4`}>
                    “{t("EveryMorning")}.”
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={handleStart}
                    className={`w-[400px] lg:w-[300px] mt-4`}
                  >
                    <Image
                      src={actionBtn}
                      alt={``}
                      width={500}
                      height={500}
                      className="transform  transition-transform duration-300 hover:scale-110 hover:opacity-80"
                    />
                  </div>
                </div>
              </div>
              <div className={`h-fit col-span-1  lg:hidden `}>
                <Image
                  className={`h-full lg:w-[50%] w-full mx-auto`}
                  src={homeImg}
                  alt={``}
                  height={763}
                  width={870}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-full h-screen block lg:hidden relative">

            <NavBar/>

            <Image className={`absolute bg-cover`} src={homeBackground} alt={``} width={1500} height={1500}/>

            <div className="w-full  h-full flex items-end justify-center relative">
                <div style={{zIndex: "-100"}} className={`w-full min-h-screen absolute z-[-1] mt-20`}>
                    <FlowingIcons/>
                </div>
                <div className="h-full bg-red-  flex flex-col items-center justify-center w-full relative z-2">

                    <div className={`w-full px-28 h-full flex flex-col justify-between pb-28 pt-6`}>
                        <div style={{fontWeight: "700", fontFamily: "Calibri"}}
                             className={`responsive-font text-white text-opacity-40 font-extrabold`}>
                            KROK PLUS
                            <div className="border-t border-2 border-white border-opacity-25 mb-8"></div>
                        </div>


                        <div style={{fontFamily: "Calibri"}}
                             className={`sm-responsive-font text-white font-bold text-5xl`}>
                            {t("GetMotivatedInMinutes")}
                        </div>
                        <div style={{fontFamily: "Calibri", lineHeight: "50px"}}
                             className={`xs-responsive-font text-white mt-4 font-semibold text-4xl`}>
                            “{t("TheEarlier")}.”
                        </div>
                        <div className={`text-white font-base text-2xl mt-4`}>
                            “{t("EveryMorning")}.”
                        </div>
                        <div style={{cursor: "pointer"}} onClick={handleStart} className={`w-80 2xl:w-96 mt-4`}>
                            <Image src={actionBtn} alt={``} width={500} height={500}/>
                        </div>
                    </div>
                </div>
                <div className={`w-[60%] h-fit `}>
                    <Image className={`h-full w-full xl:mb-32`} src={homeImg} alt={``} height={763} width={870}/>
                </div>
            </div>

        </div> */}
      </div>
    );
}

export default HomePage;
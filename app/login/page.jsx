"use client";
import { Navbar } from "@/components/ui/landing/LandingNav";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession, parseJwt } from "@/lib/helperFunctions";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// utils
import ScrollAnimationWrapper from "@/components/layout/ScrollAnimationWrapper";
import FullButton from "@/components/ui/buttons/FullButton";
import HollowButton from "@/components/ui/buttons/HollowButton";
import TextInput from "@/components/ui/inputs/TextInput";

// modals
import ModalForgotPassword from "@/components/ui/modals/ForgotPassword/ModalForgotPassword";

const Login = () => {
  const userSession = getUserSession();
  const router = useRouter();

  const [showInvalidCredentials, setShowInvalidCredentials] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isReferralPending, setIsReferralPending] = useState(false);
  const [referredData, setReferredData] = useState(null);

  // forgot password
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);



  


  useEffect(() => {
    if (isLoading) {
      const token = Cookies.get("token");
      const user = parseJwt(token);

      const { id, sub, image, role, isVerified } = user;
      const userData = {
        id: id,
        email: sub,
        image: image,
        role: role,
        isVerified: isVerified,
      };
      Cookies.set("user", JSON.stringify(userData));

      router.push(`/${user.role}`);
    }
  }, [isLoading]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.LOGIN}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            institutionalEmail: email,
            password,
          }),
        }
      );

      if (result.ok) {
        const data = await result.json();

        Cookies.set("token", data.token);
        setIsLoading(true);
      } else {
        setShowInvalidCredentials(true);
        setTimeout(() => {
          setShowInvalidCredentials(false);
          setIsLoading(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleBackHome = () => {
    router.push("/");
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const result = await signIn("credentials", {
  //       redirect: false,
  //       email,
  //       password,
  //     });

  //     if (result.ok) {
  //       console.log("Login successful:", result);
  //     } else {
  //       console.error("Login error: inside", error.message);
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error.message);
  //   }

  //   setShowInvalidCredentials(true);
  //   // Hide the message after 5 seconds
  //   setTimeout(() => {
  //     setShowInvalidCredentials(false);
  //   }, 5000);
  // };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    router.push("/registration");
  };

  return (
    <section className="py-24 md:py-28 dark:bg-[#0b1727] text-zinc-900 dark:text-white flex justify-center items-center h-screen">
      <div
        className="pattern-overlay pattern-left absolute top-0 left-0 -z-10"
        style={{ transform: "scaleY(-1)", top: "-50px" }}
      >
        <img src="/images/landing/lleft.png" alt="pattern" />
      </div>
      <div
        className="pattern-overlay pattern-right absolute bottom-[-100px] right-0 -z-10 md:bottom-[-30px] lg:bottom-[-30px]"
        style={{ transform: "scaleY(-1)" }}
      >
        <img
          src="/images/landing/lright.png"
          alt="pattern"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="container px-12 mx-auto">
        <div className="block md:hidden">
          <Navbar userType="landing" />
        </div>
        <div className="grid grid-cols-6 gap-6 h-full">
          <div className="col-span-6 md:col-span-2 lg:col-span-3">
            <div className="relative border border-2 w-full h-full overflow-hidden md:flex bg-maroon i justify-around items-center hidden bg-cover bg-center ml-20 bg-no-repeat h-[90vh] rounded-xl hidden md:block w-[80%] md:w-[150%] lg:w-[160%]">
              <div>
                <h1 className="text-white font-bold text-3xl md:text-4xl font-Merriweather">
                  Welcome To WellTalk!
                </h1>
                <p className="text-white mt-2 text-sm md:text-base font-Jaldi">
                  Sign in to get started with seamless
                  <br className="md:hidden" /> scheduling and personalized
                  <br className="hidden md:block" /> recommendations.
                </p>
                <button
                  className="w-full sm:w-40 bg-white border-2 border-gray text-md text-maroon mt-4 font-bold rounded-3xl px-4 py-2 sm:px-4 sm:py-3 hover:scale-95 transition-transform duration-300"
                  onClick={handleBackHome}
                >
                  Home
                </button>
              </div>
              <div className="absolute -bottom-16 -left-32 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 text-gold"></div>
              <div className="absolute -bottom-40 -left-4 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 text-gray"></div>
              <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 text-gold"></div>
              <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 text-gray"></div>
            </div>
          </div>

          <div className="flex flex-col col-span-6 md:col-span-4 lg:col-span-3 py-32 lg:ml-56">
            <ScrollAnimationWrapper animationType="fadeInFromRight">
              <div className="max-w-lg w-full h-full mx-auto px-0 md:px-8 lg:px-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-gold shadow-lg transform -skew-y-6 sm:skew-y-0 -rotate-6 sm:rounded-3xl w-full h-full border border-2"></div>
                  <div className="absolute inset-0 -z-10 rounded-3xl bg-maroon shadow-lg transform skew-y-6 rotate-6 sm:skew-y-0 sm:rotate-0 w-full h-full border border-2 md:hidden lg:hidden"></div>
                  <div className="relative bg-white border border-2 dark:bg-slate-800 shadow-xl rounded-2xl p-12 md:p-12 lg:py-10">
                    <h2 className="font-Merriweather dark:text-white text-2xl font-bold mb-3">
                      Sign In
                    </h2>
                    <form
                      className="w-full flex flex-col py-4"
                      onSubmit={handleLogin}
                    >
                      {showInvalidCredentials && (
                        <div className="text-red-500 font-bold text-xs pb-2">
                          Invalid email or password. Try Again.
                        </div>
                      )}
                      <div className="flex flex-col gap-y-4 pb-8">
                        <TextInput
                          label="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          className="w-full"
                        />
                        <TextInput
                          label="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          className="w-full"
                        />
                        <div className="flex justify-end">
                          <div
                            className="text-maroon text-md font-Jaldi hover:text-gold cursor-pointer"
                            onClick={(e) => setShowForgotPasswordModal(true)}
                          >
                            Forgot your Password?
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex flex-row gap-x-4 pb-1">
                        <FullButton className="w-1/2" onClick={handleLogin}>
                          Sign In
                        </FullButton>
                      </div>
                      <div className="relative">
                        <hr className="my-8 border-t border-gray-300" />
                        <span className="px-2 text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800">
                          Or
                        </span>
                      </div>
                      <div className="w-full flex flex-row gap-x-4 pb-2">
                        <HollowButton
                          className="w-1/2"
                          onClick={handleCreateAccount}
                        >
                          Create Account
                        </HollowButton>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </div>

      {showForgotPasswordModal && (
        <ModalForgotPassword
          setShowForgotPasswordModal={setShowForgotPasswordModal}
          forgotPasswordEmail={forgotPasswordEmail}
          setForgotPasswordEmail={setForgotPasswordEmail}
        />
      )}
    </section>
  );
};

export default Login;

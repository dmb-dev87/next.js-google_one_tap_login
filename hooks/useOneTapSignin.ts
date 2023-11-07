import { useEffect, useState } from "react";
import { useSession, signIn, SignInOptions } from "next-auth/react";

interface OneTapSigninOptions {
    parentConatinerId?: string;
}

const useOneTapSignin = (
    options?: OneTapSigninOptions & Pick<SignInOptions, 'redirect' | 'callbackUrl'>
) => {
    const { parentConatinerId } = options || {};
    const [isLoading, setIsLoading] = useState(false);

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            if (!isLoading) {
                const { google } = window;
                if (google) {
                    console.log(google);
                    google.accounts.id.initialize({
                        client_id: "50117126583-fkgi6uqq92vpmqnc30u8hvlkmsrui1pg.apps.googleusercontent.com",
                        callback: async (response: any) => {
                            setIsLoading(true);

                            await signIn('google', { callbackUrl: '/' })

                            // await signIn("googleonetap", {
                            //     credential: response.credential,
                            //     redirect: true,
                            //     ...options,
                            // });
                            setIsLoading(false);
                        },
                        prompt_parent_id: parentConatinerId,
                    });

                    google.accounts.id.prompt((notification: any) => {
                        if (notification.isNotDisplayed()) {
                            console.log("getNotDisplayedReason ::", notification.getNotDisplayedReason());
                        } else if (notification.isSkippedMoment()) {
                            console.log("getSkippedReason  ::", notification.getSkippedReason());
                        } else if (notification.isDismissedMoment()) {
                            console.log("getDismissedReason ::", notification.getDismissedReason());
                        }
                    });
                }
            }
        },
    });

    return { isLoading };
};

export default useOneTapSignin;
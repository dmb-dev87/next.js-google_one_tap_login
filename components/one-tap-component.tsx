"use client";

import useOneTapSignin from "hooks/useOneTapSignin";

export function OneTapComponent() {
    const { isLoading: oneTapIsLoading } = useOneTapSignin({
        redirect: false,
        parentConatinerId: "oneTap",
    })

    return (
        <div
            id="oneTap"
            className="flex flex-col"
            style={{ position: "absolute", right: "0" }}
        />
    );
};

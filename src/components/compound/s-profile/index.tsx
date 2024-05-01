import { getLoggedInUser } from "@root/lib/user-handler";
import Image from "next/image";
import { SProfileDetails } from "./s-profile-details";
import { EDataTestId } from "@src/types/common";

export async function SProfile() {
  const {
    payload: { loggedInUser },
  } = await getLoggedInUser();
  if (loggedInUser) {
    const { email, gender, profilePicLink, userName } = loggedInUser;
    return (
      <div
        data-testid={EDataTestId.SProfile}
        className={`flex flex-col justify-center items-center space-y-5`}
      >
        <div
          className={`flex justify-center items-center rounded-full overflow-hidden`}
        >
          <Image
            height={250}
            width={250}
            alt={userName}
            src={profilePicLink}
            placeholder="blur"
            priority
            blurDataURL={`/assert/blur-demo-product.jpg`}
          />
        </div>
        <div className={`space-y-1 text-center`}>
          <SProfileDetails gender={gender} email={email} userName={userName} />
        </div>
      </div>
    );
  } else {
    return <div data-testid={EDataTestId.SProfile}>No User Found!!!</div>;
  }
}

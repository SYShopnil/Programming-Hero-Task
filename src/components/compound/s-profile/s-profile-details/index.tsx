interface ISProfileDetails {
  userName: string;
  gender: string;
  userType: string;
  email: string;
}

export function SProfileDetails({
  email,
  gender,
  userName,
  userType,
}: ISProfileDetails) {
  return (
    <>
      <p className={`font-semibold`}>
        <span className={`font-bold text-[#7F4D4F]`}>UserName:</span> {userName}
      </p>
      <p className={`font-semibold`}>
        <span className={`font-bold text-[#7F4D4F]`}>Gender:</span> {gender}
      </p>
      <p className={`font-semibold`}>
        <span className={`font-bold text-[#7F4D4F]`}>User Type:</span>{" "}
        {userType}
      </p>
      <p className={`font-semibold`}>
        <span className={`font-bold text-[#7F4D4F]`}>Email: </span>
        {email}
      </p>
    </>
  );
}

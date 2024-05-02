import { cookies } from "next/headers";
import { promises as fs } from "fs";
import { IUser } from "@src/types/db/user";
import {
  IGetLoggedInUserResponse,
  ISearchIndividualUserByEmailReturn,
} from "@src/types/lib/user-handler";

export async function searchIndividualUserByEmail(
  email: string
): Promise<ISearchIndividualUserByEmailReturn> {
  return new Promise(async (resolve) => {
    const getAllUserFromJsonDB = await getAllUsers();
    if (getAllUserFromJsonDB) {
      const getUserQueryByEmail = getAllUserFromJsonDB.find((user) => {
        return user.email == email;
      });
      if (getUserQueryByEmail) {
        resolve({
          message: "",
          status: 202,
          payload: {
            user: getUserQueryByEmail,
          },
        });
      } else {
        resolve({
          message: "",
          status: 404,
          payload: {
            user: null,
          },
        });
      }
    } else {
      resolve({
        message: "",
        status: 404,
        payload: {
          user: null,
        },
      });
    }
  });
}

export async function searchIndividualUserById(
  userId: string
): Promise<ISearchIndividualUserByEmailReturn> {
  return new Promise(async (resolve) => {
    const getAllUserFromJsonDB = await getAllUsers();
    if (getAllUserFromJsonDB) {
      const getUserQueryById = getAllUserFromJsonDB.find((user) => {
        return user.userId == userId;
      });
      if (getUserQueryById) {
        resolve({
          message: "",
          status: 202,
          payload: {
            user: getUserQueryById,
          },
        });
      } else {
        resolve({
          message: "",
          status: 404,
          payload: {
            user: null,
          },
        });
      }
    } else {
      resolve({
        message: "",
        status: 404,
        payload: {
          user: null,
        },
      });
    }
  });
}

export async function getLoggedInUser(): Promise<IGetLoggedInUserResponse> {
  try {
    const cookiesStore = cookies();
    const getAuthToken = cookiesStore.get("auth"); //this toke should be a decrypted jwt token
    if (getAuthToken) {
      const { value: token } = getAuthToken;
      const getUserEmail = token;
      const { message, payload } = await searchIndividualUserByEmail(
        getUserEmail
      );

      if (payload.user) {
        return {
          message: message,
          status: 202,
          payload: {
            isLoggedIn: true,
            loggedInUser: payload.user,
          },
        };
      } else {
        return {
          message: message,
          status: 404,
          payload: {
            isLoggedIn: false,
            loggedInUser: null,
          },
        };
      }
    } else {
      return {
        message: "",
        status: 404,
        payload: {
          isLoggedIn: false,
          loggedInUser: null,
        },
      };
    }
  } catch (err) {
    return {
      message: "Some things went wrong",
      status: 404,
      payload: {
        isLoggedIn: false,
        loggedInUser: null,
      },
    };
  }
}

export async function getAllUsers(): Promise<IUser[] | null> {
  return new Promise(async (resolve) => {
    const parseUserFromJsonDB: IUser[] = JSON.parse(
      await fs.readFile(process.cwd() + "/public/db/user.db.json", "utf8")
    );
    if (parseUserFromJsonDB) {
      resolve(parseUserFromJsonDB);
    } else {
      resolve(null);
    }
  });
}

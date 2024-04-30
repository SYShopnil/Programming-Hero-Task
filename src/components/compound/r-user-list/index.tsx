import { getAllUsers } from "@root/lib/user-handler";
import { RTableBody } from "@src/components/root/r-table";
import { EDataTestId } from "@src/types/common";
import { IUser } from "@src/types/db/user";

export async function RUserList() {
  const users: IUser[] | null = await getAllUsers();
  if (users) {
    return (
      <div
        data-testid={EDataTestId.rUserList}
        className="flex justify-center items-center"
      >
        <div className="w-full lg:w-1/2 bg-gray-100 rounded-lg shadow-md">
          {/* table header */}
          <div className="bg-gray-700 text-white py-2 px-4">
            <div className="flex">
              <div className="w-3/6 text-center">Email</div>
              <div className="w-1/6 text-center">User Name</div>
              <div className="w-1/6 text-center">Profile Picture</div>
              <div className="w-1/6 text-center">User Type</div>
              <div className="w-1/6 text-center">Gender</div>
            </div>
          </div>

          <div className="py-2 px-4">
            <RTableBody users={users} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No User Found!!!</div>;
  }
}

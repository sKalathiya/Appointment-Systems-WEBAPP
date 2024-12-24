import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { IAppointmentPost } from "../HELPERS/types";

interface UserDetailProps {
    setDataModel: Dispatch<SetStateAction<IAppointmentPost>>;
    dataModel: IAppointmentPost;
}

const UserDetail = ({ setDataModel, dataModel }: UserDetailProps) => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDataModel({ ...dataModel, [name]: value });
    };

    return (
        <section className="grid grid-rows-2 grid-cols-2 pt-2 gap-8">
            <div className="input input-bordered flex items-center gap-2">
                <p className="max-lg:hidden text-nowrap">Name :</p>
                <input
                    type="text"
                    className="w-full"
                    placeholder="Name"
                    value={dataModel.userName}
                    name="userName"
                    onChange={(e) => onChange(e)}
                />
            </div>

            <div className="input input-bordered flex items-center gap-2">
                <p className="max-lg:hidden text-nowrap">Email :</p>
                <input
                    type="text"
                    className="w-full"
                    placeholder="Email"
                    value={dataModel.userEmail}
                    name="userEmail"
                    onChange={(e) => onChange(e)}
                />
            </div>
            <div className="input input-bordered flex items-center gap-2">
                <p className="max-lg:hidden text-nowrap">Phone :</p>
                <input
                    type="text"
                    className="w-full"
                    placeholder="Phone"
                    value={dataModel.userPhone}
                    name="userPhone"
                    onChange={(e) => onChange(e)}
                />
            </div>
        </section>
    );
};

export default UserDetail;

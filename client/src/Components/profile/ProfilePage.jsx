// import React from 'react';


// const ProfilePage = () => {
//   const dispatch = useDispatch();
//   // const profile = useSelector();
//   const { register, handleSubmit } = useForm();

//   const onSubmit = (data) => {
//     // dispatch(setProfile(data));
//     // Send the data to the backend to update the user profile
//     // You can use fetch or axios for this purpose
//     // Example: fetch('/api/update-profile', { method: 'POST', body: JSON.stringify(data) })
//   };

// // const ProfileForm = ({ user, onSubmit }) => {
// //   const { register, handleSubmit, setValue } = useForm({
// //     defaultValues: user,
// //   });

//   const handleFileChange = (e) => {
//     // Handle file change and set the file value in the form data
//     // setValue('avatar', e.target.files[0]);
//   };

//   return (
//     // <div>
//     //   <h1>Edit Profile</h1>
//     //   <form onSubmit={handleSubmit(onSubmit)}>
//     //     <label>
//     //       Name:
//     //       <input {...register('name')} />
//     //     </label>
//     //     <br />
//     //     <label>
//     //       Email:
//     //       <input {...register('email')} />
//     //     </label>
//     //     <br />
//     //     <label>
//     //       Password:
//     //       <input
//     //         type="password"
//     //         {...register('password')}

//     //       />
//     //     </label>
//     //     <br />
//     //     <label>
//     //       Mobile:
//     //       <input {...register('mobile')} />
//     //     </label>
//     //     <br />
//     //     <label>
//     //       Address:
//     //       <input {...register('address')} />
//     //     </label>
//     //     <br />
//     //     <label>
//     //       Avatar:
//     //       <input {...register('avatar')} />
//     //     </label>
//     //     <br />
//     //     <button type="submit">Update Profile</button>
//     //   </form>
//     // </div>
//     <>
//       <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600">Name:</label>
//         <input className="form-input mt-1 p-2" {...register('name')} />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600">Email:</label>
//         <input className="form-input mt-1 p-2" {...register('email')} />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600">Password:</label>
//         <input className="form-input mt-1 p-2" type="password" {...register('password')} />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600">Mobile:</label>
//         <input className="form-input mt-1 p-2" {...register('mobile')} />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600">Address:</label>
//         <input className="form-input mt-1 p-2" {...register('address')} />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-600">Avatar:</label>
//         <input type="file" onChange={handleFileChange} className="form-input mt-1 p-2" />
//       </div>
//       <div>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//           Update Profile
//         </button>
//       </div>
//     </form>
//     </>
//   );
// };

// //   };

// export default ProfilePage;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from "../../features/auth/authSlice";
import { fetchUserProfile, updateUserProfile } from "../../features/userProfilePage/profilePageApi";
import { getUserProfile } from "../../features/userProfilePage/profilePageSlice";

const ProfilePage = () => {

  const userID = useSelector(selectLoggedInUser);
  const userProfile = useSelector(getUserProfile)
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')


useEffect(() => {

  console.log(userID.Data);
  const userIDData = userID.Data;
  dispatch(fetchUserProfile(userIDData))
  console.log(userProfile);
},[dispatch])


console.log(userProfile);

const { register, handleSubmit, setValue, reset } = useForm();

useEffect(() => {
  if (userProfile && userProfile.name) {
    reset({ name: userProfile.name, email: userProfile.email,mobile: userProfile.mobile, avatar:  avatar});
  }
}, [userProfile, reset]);


  const handleFileChange = (e) => {
    // Handle file change and set the file value in the form data
    setValue("avatar", e.target.files[0].name);
    setAvatar("avatar", e.target.files[0].name)
    console.log(e.target.files[0].name);

  };

  console.log(name);

  const onSubmit = (data) => {
    console.log(data);
    const userIDData = userID.Data;
    dispatch(updateUserProfile({userIDData, data}))
  }
  return (
    <>
      <div className="">
        <h1 className="text-center font-bold text-2xl mb-10">
          Edit Your Profile
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-2"
      >
        <div className="mb-4">
          <label className="block text-lg font-bold text-gray-600 ">
            Name
          </label>
          <input
          onChange={(e) => setName(e.target.value)}
            className="form-input w-full mt-1 p-2 rounded-xl"
            {...register("name")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-bold text-gray-600">
            Email
          </label>
          <input
            className="form-input mt-1 p-2 w-full rounded-xl"
            {...register("email")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-bold text-gray-600">
            Mobile
          </label>
          <input
            className="form-input mt-1 p-2 w-full rounded-xl"
            {...register("mobile")}
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-lg font-bold text-gray-600">
            Address:
          </label>
          <input
            className="form-input mt-1 p-2 w-full rounded-xl"
            {...register("address")}
          />
        </div> */}
        <div className="mb-4">
          <label className="block text-lg font-bold text-gray-600">
            Avatar
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="form-input mt-1 p-2 w-full rounded-xl"
          />
        </div>
        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfilePage;

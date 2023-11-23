import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAddress } from '../../features/checkOut/checkOutSlice'
import { useForm } from 'react-hook-form'
import { selectLoggedInUser } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { addAddressAsync, fetchAllAddressAsync } from '../../features/checkOut/checkOutAPI'

const Address = () => {
  const dispatch = useDispatch();
  const addresses = useSelector(selectAddress);
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

    useEffect(() => {
      
    },[])

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
      console.log("Test");
      console.log(data);
      dispatch(addAddressAsync({ userID: user.Data, data }));
      // console.log();
      reset()
    };
    const handleAddress = () => {
      navigate("/checkout");
    };
  return (
    <div className='px-10'>
       <div className="lg:col-span-3 mt-8">
          <form
            noValidate
            className="bg-white px-5 py-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Full Name
                    </label>

                    <div className="mt-2">
                      <input
                        id="text"
                        name="fullName"
                        {...register("fullName", {
                          required: "Full Name is required",
                        })}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.fullName && (
                        <p className="text-red-500">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                          message: "email is not valid",
                        },
                      })}
                      type="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="col-span-full">
                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                      </label>

                      <div className="mt-2">
                        <input
                          type="text"
                          name="streetAddress"
                          id="streetAddress"
                          {...register("streetAddress", {
                            required: "Street Address is required",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.streetAddress && (
                          <p className="text-red-500">
                            {errors.streetAddress.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        id="text"
                        name="city"
                        {...register("city", {
                          required: "City is required",
                        })}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.city && (
                        <p className="text-red-500">{errors.city.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        id="text"
                        name="state"
                        {...register("state", {
                          required: "State is required",
                        })}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.state && (
                        <p className="text-red-500">{errors.state.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      ZIP / Pincode
                    </label>
                    <div className="mt-2">
                      <input
                        id="pincode"
                        name="pincode"
                        {...register("pincode", {
                          required: "Pincode is required",
                        })}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.pincode && (
                        <p className="text-red-500">{errors.pincode.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Country
                    </label>

                    <div className="mt-2">
                      <select {...register("country")} name="country">
                        <option value="India">India</option>
                        <option value="Canada">Canada</option>
                        <option value="Mexico">Mexico</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  onClick={handleAddress}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Select Existing Address
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add address
                </button>
              </div>
            </div>
          </form>
        </div>
        
    </div>
  )
}

export default Address
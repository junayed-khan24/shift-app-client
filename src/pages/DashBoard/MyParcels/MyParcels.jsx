import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${user.email}`
      );
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/parcels/${id}`);

        if (res.data.deletedCount > 0) {
          Swal.fire(
            "Deleted!",
            "Parcel has been deleted.",
            "success"
          );
          refetch(); // 🔄 refresh table
        }
      }
    });
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        My Parcels ({parcels.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm md:text-base">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Created</th>
              <th>Cost</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>

                <td className="capitalize">
                  {parcel.type}
                </td>

                <td>
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </td>

                <td>৳ {parcel.cost}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        parcel.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {parcel.status === "Paid"
                      ? "Paid"
                      : "Unpaid"}
                  </span>
                </td>

                <td className="flex flex-wrap justify-center gap-2">
                  <button className="btn btn-xs btn-info">
                    View
                  </button>

                  {parcel.status !== "Paid" && (
                   <Link to={`/dashboard/payment-${parcel._id}`}>
                     <button className="btn btn-xs btn-success">
                       Pay
                     </button>
                   </Link>
                  )}

                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {parcels.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            No parcels found
          </p>
        )}
      </div>
    </div>
  );
};

export default MyParcels;

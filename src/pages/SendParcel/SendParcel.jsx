import { Send, Package, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";

const serviceCenters = [
  // Dhaka
  { id: 1, region: "Dhaka", district: "Dhaka", center: "Uttara Hub" },
  { id: 2, region: "Dhaka", district: "Dhaka", center: "Mirpur Hub" },
  { id: 3, region: "Dhaka", district: "Gazipur", center: "Tongi Hub" },

  // Chattogram
  { id: 4, region: "Chattogram", district: "Chattogram", center: "Agrabad Hub" },
  { id: 5, region: "Chattogram", district: "Cox's Bazar", center: "Kolatoli Hub" },

  // Khulna
  { id: 6, region: "Khulna", district: "Khulna", center: "Sonadanga Hub" },
  { id: 7, region: "Khulna", district: "Jessore", center: "Jessore Sadar Hub" },

  // Sylhet
  { id: 8, region: "Sylhet", district: "Sylhet", center: "Amberkhana Hub" },
  { id: 9, region: "Sylhet", district: "Moulvibazar", center: "Moulvibazar Hub" },
];




const SendParcel = ({ user }) => {
  const { register, handleSubmit, watch } = useForm();
  const parcelType = watch("type");

  const regions = [...new Set(serviceCenters.map(sc => sc.region))];

  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const senderCenters = serviceCenters.filter(sc => sc.region === senderRegion);
  const receiverCenters = serviceCenters.filter(sc => sc.region === receiverRegion);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold flex justify-center items-center gap-2">
          <Send className="w-8 h-8 text-primary" />
          Send a Parcel
        </h2>
        <p className="text-gray-500 mt-2">
          Door to Door delivery – Pickup & Delivery details required
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-100 shadow-2xl rounded-2xl p-8 space-y-10"
      >
        {/* ================= Parcel Info ================= */}
        <section className="border rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Parcel Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="label font-medium">Parcel Type</label>
              <select
                className="select select-bordered w-full"
                {...register("type", { required: true })}
              >
                <option value="">Select Type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
            </div>

            <div>
              <label className="label font-medium">Parcel Title</label>
              <input
                className="input input-bordered w-full"
                placeholder="e.g. Office Documents"
                {...register("title", { required: true })}
              />
            </div>

            {parcelType === "non-document" && (
              <div>
                <label className="label font-medium">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  className="input input-bordered w-full"
                  placeholder="Optional"
                  {...register("weight")}
                />
              </div>
            )}
          </div>
        </section>

        {/* ================= Sender & Receiver ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sender */}
          <section className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Sender Information
            </h3>

            <div className="space-y-4">
              <input
                className="input input-bordered w-full"
                defaultValue={user?.displayName}
                placeholder="Sender Name"
                {...register("senderName", { required: true })}
              />

              <input
                className="input input-bordered w-full"
                placeholder="Contact Number"
                {...register("senderContact", { required: true })}
              />

              <select
                className="select select-bordered w-full"
                {...register("senderRegion", { required: true })}
              >
                <option value="">Select Region</option>
                {regions.map(region => (
                  <option key={region}>{region}</option>
                ))}
              </select>

              <select
                className="select select-bordered w-full"
                {...register("senderCenter", { required: true })}
              >
                <option value="">Select District / Service Center</option>
                {senderCenters.map(sc => (
                  <option key={sc.id} value={sc.center}>
                    {sc.district} – {sc.center}
                  </option>
                ))}
              </select>

              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Pickup Address"
                {...register("senderAddress", { required: true })}
              />

              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Pickup Instruction"
                {...register("pickupInstruction", { required: true })}
              />
            </div>
          </section>

          {/* Receiver */}
          <section className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              Receiver Information
            </h3>

            <div className="space-y-4">
              <input
                className="input input-bordered w-full"
                placeholder="Receiver Name"
                {...register("receiverName", { required: true })}
              />

              <input
                className="input input-bordered w-full"
                placeholder="Contact Number"
                {...register("receiverContact", { required: true })}
              />

              <select
                className="select select-bordered w-full"
                {...register("receiverRegion", { required: true })}
              >
                <option value="">Select Region</option>
                {regions.map(region => (
                  <option key={region}>{region}</option>
                ))}
              </select>

              <select
                className="select select-bordered w-full"
                {...register("receiverCenter", { required: true })}
              >
                <option value="">Select District / Service Center</option>
                {receiverCenters.map(sc => (
                  <option key={sc.id} value={sc.center}>
                    {sc.district} – {sc.center}
                  </option>
                ))}
              </select>

              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Delivery Address"
                {...register("receiverAddress", { required: true })}
              />

              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Delivery Instruction"
                {...register("deliveryInstruction", { required: true })}
              />
            </div>
          </section>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button className="btn btn-primary btn-lg gap-2 px-12">
            <Send className="w-5 h-5" />
            Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;

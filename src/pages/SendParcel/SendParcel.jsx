import { Send, Package, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const SendParcel = ({ user }) => {
  const { register, handleSubmit, watch, reset } = useForm();

  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // Warehouses from loader
  const warehouses = useLoaderData();

  const regions = [...new Set(warehouses.map(w => w.region))];
  const senderCenters = warehouses.filter(w => w.region === senderRegion);
  const receiverCenters = warehouses.filter(w => w.region === receiverRegion);

  // ================= PRICING LOGIC =================
  const calculateCost = (data) => {
    const sameCity = data.senderRegion === data.receiverRegion;
    let breakdown = [];
    let total = 0;

    if (data.type === "document") {
      const cost = sameCity ? 60 : 80;
      breakdown.push(`Document Charge: ৳${cost}`);
      total = cost;
    } else {
      const weight = Number(data.weight || 0);

      if (weight <= 3) {
        const base = sameCity ? 110 : 150;
        breakdown.push(`Base Charge (≤3kg): ৳${base}`);
        total = base;
      } else {
        const base = sameCity ? 110 : 150;
        const extraKg = weight - 3;
        const extraCost = extraKg * 40;
        breakdown.push(`Base Charge (3kg): ৳${base}`);
        breakdown.push(`Extra Weight (${extraKg}kg × ৳40): ৳${extraCost}`);
        total = base + extraCost;

        if (!sameCity) {
          breakdown.push(`Outside District Extra: ৳40`);
          total += 40;
        }
      }
    }

    return { total, breakdown };
  };

  // ================= SUBMIT =================
  const onSubmit = (data) => {
    const { total, breakdown } = calculateCost(data);

    Swal.fire({
      title: "Confirm Parcel & Pricing",
      icon: "info",
      html: `
        <div class="text-left space-y-2">
          <p><b>Parcel:</b> ${data.title}</p>
          <p><b>From:</b> ${data.senderCenter}</p>
          <p><b>To:</b> ${data.receiverCenter}</p>
          <hr/>
          <p class="font-semibold">Price Breakdown:</p>
          <ul class="list-disc pl-5">
            ${breakdown.map(item => `<li>${item}</li>`).join("")}
          </ul>
          <hr/>
          <p class="text-xl font-bold text-green-600 mt-2">
            Total Cost: ৳${total}
          </p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Go Back & Edit",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
    }).then(result => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost: total,
          status: "Pending",
          creation_date: new Date().toISOString(),
        };

        console.log("Parcel Saved:", parcelData);

        Swal.fire({
          icon: "success",
          title: "Parcel Confirmed!",
          text: "Redirecting to payment...",
          timer: 2000,
          showConfirmButton: false,
        });

        reset();
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
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
        {/* Parcel Info */}
        <section className="border rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Parcel Information
          </h3>

          <div className="space-y-4">
            {/* ONLY TITLE HAS LABEL */}
            <div>
              <label className="label font-medium">Parcel Title</label>
              <input
                className="input input-bordered w-full"
                placeholder="e.g. Office Documents"
                {...register("title", { required: true })}
              />
            </div>

            <select
              className="select select-bordered w-full"
              {...register("type", { required: true })}
            >
              <option value="">Select Parcel Type</option>
              <option value="document">Document</option>
              <option value="non-document">Non-Document</option>
            </select>

            {parcelType === "non-document" && (
              <input
                type="number"
                step="0.1"
                className="input input-bordered w-full"
                placeholder="Parcel Weight (kg)"
                {...register("weight", { required: true })}
              />
            )}
          </div>
        </section>

        {/* Sender & Receiver */}
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
                {regions.map(r => (
                  <option key={r}>{r}</option>
                ))}
              </select>

              <select
                className="select select-bordered w-full"
                {...register("senderCenter", { required: true })}
              >
                <option value="">Select District / Center</option>
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
                {regions.map(r => (
                  <option key={r}>{r}</option>
                ))}
              </select>

              <select
                className="select select-bordered w-full"
                {...register("receiverCenter", { required: true })}
              >
                <option value="">Select District / Center</option>
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
          <button className="btn btn-primary btn-lg gap-2 px-12 text-black font-semibold">
            <Send className="w-5 h-5" />
            Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;

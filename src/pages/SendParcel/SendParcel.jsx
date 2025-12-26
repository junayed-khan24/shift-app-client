import { Send, Package, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const warehouses = useLoaderData();
  const { register, handleSubmit, watch, reset } = useForm();


  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const weight = watch("weight");

  const regions = [...new Set(warehouses.map(w => w.region))];

  const senderCenters = warehouses.filter(w => w.region === senderRegion);
  const receiverCenters = warehouses.filter(w => w.region === receiverRegion);

  /* ================= PRICE CALCULATION ================= */
  const calculateCost = (data) => {
    const isWithinCity = data.senderRegion === data.receiverRegion;
    let breakdown = [];
    let total = 0;

    if (data.type === "document") {
      total = isWithinCity ? 60 : 80;
      breakdown.push(`Document charge: ৳${total}`);
    }

    if (data.type === "non-document") {
      const w = Number(data.weight || 0);

      if (w <= 3) {
        total = isWithinCity ? 110 : 150;
        breakdown.push(`Base charge (≤3kg): ৳${total}`);
      } else {
        const base = isWithinCity ? 110 : 150;
        const extraKg = w - 3;
        const extraKgCost = extraKg * 40;
        const outsideExtra = !isWithinCity ? 40 : 0;

        total = base + extraKgCost + outsideExtra;

        breakdown.push(`Base charge (3kg): ৳${base}`);
        breakdown.push(`Extra ${extraKg}kg × ৳40 = ৳${extraKgCost}`);

        if (!isWithinCity) {
          breakdown.push(`Outside city surcharge: ৳40`);
        }
      }
    }

    return {
      total,
      breakdown,
      deliveryType: isWithinCity ? "Within City" : "Outside City / District",
    };
  };

  /* ================= SUBMIT ================= */
  const onSubmit = (data) => {
    const priceInfo = calculateCost(data);

    Swal.fire({
      title: "Confirm Parcel & Pricing",
      icon: "info",
      html: `
        <div class="text-left space-y-1">
          <p><b>Parcel:</b> ${data.title}</p>
          <p><b>Delivery Type:</b> ${priceInfo.deliveryType}</p>
          <hr/>
          ${priceInfo.breakdown.map(b => `<p>• ${b}</p>`).join("")}
          <hr/>
          <p class="text-xl font-bold text-green-600 mt-2">
            Total Cost: ৳${priceInfo.total}
          </p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Edit Parcel",
      confirmButtonColor: "#16a34a",
    }).then(result => {
      if (result.isConfirmed) {
        const parcelPayload = {
          ...data,
          cost: priceInfo.total,
          deliveryType: priceInfo.deliveryType,

          /* 🔥 REQUIRED EXTRA DATA */
          createdByEmail: user?.email,
          createdAt: new Date().toISOString(), // perfect for tracking
          trackingId: `TRK-${Date.now()}`,

          status: "Pending",
        };

        console.log("FINAL PARCEL DATA:", parcelPayload);

        // Send to server
        axiosSecure.post('/parcels', parcelPayload)
         .then(res => {
            console.log("Parcel created:", res.data);
            if (res.data.insertedId) {
              // Redirect to payment page or show payment modal
              Swal.fire({
                icon: "success",
                title: "Parcel Created!",
                text: "Proceeding to payment...",
                timer: 2000,
                showConfirmButton: false,
              });
            }
         })
         


        

        reset();
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold flex justify-center gap-2">
          <Send className="text-primary" /> Send a Parcel
        </h2>
        <p className="text-gray-500">
          Door to Door delivery – Pickup & Delivery details required
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-100 shadow-2xl rounded-2xl p-8 space-y-10"
      >
        {/* PARCEL INFO */}
        <section className="border rounded-xl p-6">
          <h3 className="text-xl font-semibold flex gap-2 mb-4">
            <Package /> Parcel Info
          </h3>

          <div className="space-y-4">
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
              <option value="">Parcel Type</option>
              <option value="document">Document</option>
              <option value="non-document">Non-Document</option>
            </select>

            {parcelType === "non-document" && (
              <input
                type="number"
                step="0.1"
                className="input input-bordered w-full"
                placeholder="Weight (kg)"
                {...register("weight", { required: true })}
              />
            )}
          </div>
        </section>

        {/* SENDER & RECEIVER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sender */}
          <section className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold flex gap-2 mb-4">
              <MapPin /> Sender Info
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
                {regions.map(r => <option key={r}>{r}</option>)}
              </select>

              <select
                className="select select-bordered w-full"
                {...register("senderCenter", { required: true })}
              >
                <option value="">Select District / Center</option>
                {senderCenters.map(sc => (
                  <option key={sc.id}>
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
            <h3 className="text-xl font-semibold flex gap-2 mb-4">
              <MapPin /> Receiver Info
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
                {regions.map(r => <option key={r}>{r}</option>)}
              </select>

              <select
                className="select select-bordered w-full"
                {...register("receiverCenter", { required: true })}
              >
                <option value="">Select District / Center</option>
                {receiverCenters.map(sc => (
                  <option key={sc.id}>
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

        <div className="text-center">
          <button className="btn btn-primary btn-lg px-12 gap-2 font-semibold text-black">
            <Send /> Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;

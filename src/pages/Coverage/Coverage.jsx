import { motion, useScroll } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from "react-router";



const Coverage = () => {
    const { scrollYProgress } = useScroll();
    const warehouses = useLoaderData();

    return (
        <>
            {/* Scroll Progress Bar */}
            <motion.div
                style={{
                    scaleX: scrollYProgress,
                }}
                className="fixed top-0 left-0 right-0 h-[6px] bg-primary origin-left z-50"
            />


             <div className="min-h-screen px-4 py-10">
      
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        We are available in 64 districts
      </h1>

      {/* Map Section */}
      <div className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={[23.685, 90.3563]} // Bangladesh center
          zoom={8}
          scrollWheelZoom={false}
          className="h-[700px] w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Example Marker */}
          {
            warehouses.map((warehouse) => (
              <Marker
                key={warehouse.id}  
                position={[warehouse.latitude, warehouse.longitude]}
              >
                <Popup>
                    <strong>{warehouse.district}</strong> <br /> 
                    {warehouse.covered_area.join(',')}
                </Popup>
              </Marker>
            ))
          }

        </MapContainer>
      </div>

    </div>


            {/* Page Content */}
            <div className="max-w-xl mx-auto px-4 py-32 space-y-6">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Fringilla quam urna. Cras turpis elit, euismod eget ligula.</p>
                <h2 className="text-2xl font-bold">Sub-header</h2>
                <p>In eget sodales arcu, consectetur efficitur metus.</p>
                <p>Pellentesque id lacus pulvinar elit pulvinar pretium.</p>
                {/* rest content */}
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Fringilla quam urna. Cras turpis elit, euismod eget ligula.</p>
                <h2 className="text-2xl font-bold">Sub-header</h2>
                <p>In eget sodales arcu, consectetur efficitur metus.</p>
                <p>Pellentesque id lacus pulvinar elit pulvinar pretium.</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Fringilla quam urna. Cras turpis elit, euismod eget ligula.</p>
                <h2 className="text-2xl font-bold">Sub-header</h2>
                <p>In eget sodales arcu, consectetur efficitur metus.</p>
                <p>Pellentesque id lacus pulvinar elit pulvinar pretium.</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Fringilla quam urna. Cras turpis elit, euismod eget ligula.</p>
                <h2 className="text-2xl font-bold">Sub-header</h2>
                <p>In eget sodales arcu, consectetur efficitur metus.</p>
                <p>Pellentesque id lacus pulvinar elit pulvinar pretium.</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Fringilla quam urna. Cras turpis elit, euismod eget ligula.</p>
                <h2 className="text-2xl font-bold">Sub-header</h2>
                <p>In eget sodales arcu, consectetur efficitur metus.</p>
                <p>Pellentesque id lacus pulvinar elit pulvinar pretium.</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Fringilla quam urna. Cras turpis elit, euismod eget ligula.</p>
                <h2 className="text-2xl font-bold">Sub-header</h2>
                <p>In eget sodales arcu, consectetur efficitur metus.</p>
                <p>Pellentesque id lacus pulvinar elit pulvinar pretium.</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Fringilla quam urna. Cras turpis elit, euismod eget ligula.</p>
                <h2 className="text-2xl font-bold">Sub-header</h2>
                <p>In eget sodales arcu, consectetur efficitur metus.</p>
                <p>Pellentesque id lacus pulvinar elit pulvinar pretium.</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Fringilla quam urna. Cras turpis elit, euismod eget ligula.</p>
                <h2 className="text-2xl font-bold">Sub-header</h2>
                <p>In eget sodales arcu, consectetur efficitur metus.</p>
                <p>Pellentesque id lacus pulvinar elit pulvinar pretium.</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Fringilla quam urna. Cras turpis elit, euismod eget ligula.</p>
                <h2 className="text-2xl font-bold">Sub-header</h2>
                <p>In eget sodales arcu, consectetur efficitur metus.</p>
                <p>Pellentesque id lacus pulvinar elit pulvinar pretium.</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Fringilla quam urna. Cras turpis elit, euismod eget ligula.</p>
                <h2 className="text-2xl font-bold">Sub-header</h2>
                <p>In eget sodales arcu, consectetur efficitur metus.</p>
                <p>Pellentesque id lacus pulvinar elit pulvinar pretium.</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Fringilla quam urna. Cras turpis elit, euismod eget ligula.</p>
                <h2 className="text-2xl font-bold">Sub-header</h2>
                <p>In eget sodales arcu, consectetur efficitur metus.</p>
                <p>Pellentesque id lacus pulvinar elit pulvinar pretium.</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Fringilla quam urna. Cras turpis elit, euismod eget ligula.</p>
                <h2 className="text-2xl font-bold">Sub-header</h2>
                <p>In eget sodales arcu, consectetur efficitur metus.</p>
                <p>Pellentesque id lacus pulvinar elit pulvinar pretium.</p>
            </div>
           
        </>
    );
};

export default Coverage;

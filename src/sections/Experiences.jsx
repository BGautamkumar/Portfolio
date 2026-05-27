import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";
import ParticlesOverlay from "../components/ParticlesOverlay";

const Experiences = () => {
  return (
    <div className="w-full relative">
      <ParticlesOverlay />
      <Timeline data={experiences} />
    </div>
  );
};
 
export default Experiences;
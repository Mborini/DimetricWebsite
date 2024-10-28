import { Feature } from "@/types/feature";
import Image from "next/image";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <Image src="/icons/disaster-management.png" width={40} height={40} alt="icon" />
    ),
    title: "Disaster Risk Reduction and Management",
    paragraph:"We specialize in helping communities and organizations prepare for and mitigate the effects of disasters. Through risk assessments, capacity-building programs, and early warning systems, we aim to reduce the vulnerability of at-risk areas and minimize potential damage before disasters strike."
  },
  {
    id: 2,
    icon: (
      <Image src="/icons/recovery.png" width={40} height={40} alt="icon" />
    ),
    title: "Recovery, Planning and Reconstruction",
    paragraph:"Our team supports post-disaster recovery efforts by providing strategic planning and technical assistance for rebuilding. We focus on resilience and sustainability, ensuring that recovery efforts contribute to long-term development and improved disaster preparedness."
  },
  {
    id: 3,
    icon: (
      <Image src="/icons/intervention.png" width={40} height={40} alt="icon" />
    ),
    title: "Post Disaster Risk Interventions",
    paragraph:
      "After a disaster, quick and effective interventions are crucial. We offer post-disaster assessments, immediate response planning, and long-term recovery strategies. Our goal is to support communities in their journey to rebuild stronger and safer.",
  },
  {
    id: 4,
    icon: (
      <Image src="/icons/trees.png" width={40} height={40} alt="icon" />
    ),
    title: "Environment Management",
    paragraph:
      "We provide consultancy services focused on environmental protection and sustainable development. From climate change mitigation strategies to waste management solutions, we aim to help clients meet regulatory requirements and achieve environmental sustainability.",
  },
  {
    id: 5,
    icon: (
      <Image src="/icons/risk-management.png" width={40} height={40} alt="icon" />
    ),
    title: "Disaster Management",
    paragraph:
      "Our disaster management services encompass the entire disaster lifecycle, from prevention and preparedness to response and recovery. We work closely with governments, NGOs, and private entities to develop comprehensive disaster management frameworks that safeguard lives and infrastructure.",
  },
  {
    id: 6,
    icon: (
      <Image src="/icons/waste-sorting.png" width={40} height={40} alt="icon" />
    ),
    title: "Solid Waste Management",
    paragraph:
      "We offer innovative solutions for managing solid waste efficiently and sustainably. Our services include waste audits, recycling strategies, and landfill management, ensuring that waste is handled in an environmentally responsible manner.",
  },
];
export default featuresData;

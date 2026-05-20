"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { getAllDoctors, getDoctorPatientsCount } from "@/services/doctorService";
import Search from "@/components/Search";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ITEMS_PER_PAGE = 6;

const specialties = [
  "Generalist",
  "Cardiologist",
  "Dermatologist",
  "Endocrinologist",
  "Gastroenterologist",
  "Neurologist",
  "Pediatrician",
  "Psychiatrist",
];

const hospitals = [
  "Hospital Mongi Slim",
  "Hospital Charles Nicolle",
  "Hospital La Rabta",
  "Hospital Razi",
  "Hospital Sahloul",
  "Hospital Farhat Hached",
  "Hospital Fattouma Bourguiba",
  "Hospital Hedi Chaker",
  "Hospital Habib Bourguiba",
];

function DoctorCard({ doctor, onBook }) {
  const { data: patientsCount } = useQuery({
    queryKey: ["doctorPatients", doctor._id],
    queryFn: async () => {
      const res = await getDoctorPatientsCount(doctor._id);
      return res.data.patientsCount;
    },
  });

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <motion.div whileHover={{ scale: 1.02 }} className="relative">
          <img
            src={doctor.photo || "/assets/avatar-doctor.jpg"}
            alt={`Dr. ${doctor.firstName}`}
            className="w-full h-48 object-cover"
          />
        </motion.div>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={doctor.photo} />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">
                Dr. {doctor.firstName} {doctor.lastName}
              </p>
              <p className="text-sm text-gray-500">{doctor.specialty}</p>
            </div>
          </div>
          {doctor.hospital && (
            <p className="text-sm text-gray-600">{doctor.hospital}</p>
          )}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{patientsCount || 0} patients</span>
            <span className="font-semibold text-primary-500">
              ₹{doctor.price}/hr
            </span>
          </div>
          <Button
            className="w-full mt-2"
            onClick={() => onBook(doctor._id)}
          >
            Book a consultation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PatientDoctorsPage() {
  const router = useRouter();
  const searchText = useSelector((state) => state.searchReducer.searchText.text);
  const [specialty, setSpecialty] = useState("");
  const [hospital, setHospital] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const buildFilters = () => {
    const params = new URLSearchParams();
    if (specialty && specialty !== "all") params.append("specialty", specialty);
    if (hospital && hospital !== "all") params.append("hospital", hospital);
    if (searchText) params.append("text", searchText);
    return params.toString();
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["doctors", specialty, hospital, searchText, sortBy],
    queryFn: async () => {
      const res = await getAllDoctors(buildFilters(), sortBy);
      return res.data.results || [];
    },
  });

  const handleBook = (doctorId) => {
    router.push(`/patient/consultation/${doctorId}`);
  };

  const totalPages = Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);
  const paginatedDoctors = data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="px-8 py-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">Find a Doctor</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <Search />
          <Select
            value={specialty}
            onValueChange={(v) => {
              setSpecialty(v === "all" ? "" : v);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All specialties</SelectItem>
              {specialties.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={hospital}
            onValueChange={(v) => {
              setHospital(v === "all" ? "" : v);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Hospital" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All hospitals</SelectItem>
              {hospitals.map((h) => (
                <SelectItem key={h} value={h}>
                  {h}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sortBy}
            onValueChange={(v) => {
              setSortBy(v === "none" ? "" : v);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No sorting</SelectItem>
              <SelectItem value="price:asc">Price: Low to High</SelectItem>
              <SelectItem value="price:desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isPending ? (
          <div className="flex justify-center mt-10">
            <LoadingSpinner />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 mt-10">{error.message}</div>
        ) : !paginatedDoctors?.length ? (
          <div className="text-center text-gray-500 mt-10">
            No doctors found matching your criteria.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedDoctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} onBook={handleBook} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

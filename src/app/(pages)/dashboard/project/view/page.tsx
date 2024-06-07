"use client"
import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/AdminComponent/ProjectCard";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  const [data, setData] = useState([]);

  const getProjects = async () => {
    try {

      const response = await fetch(
        "/api/portfolio/project/allprojects" + session?.user?.id,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("data", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async ( id : any) => {
    try {
       const response = await fetch(`/api/portfolio/project/deleteproject/${id}`, {
        method: "DELETE",
       })

       if(response.ok){
        console.log("project deleted")
       }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // getProjects();
  }, []);

  return (
    <div className="w-full mt-2 border rounded-md px-4 py-10">
      <h1 className="text-2xl font-medium">Manage Projects</h1>
      <ProjectCard />
    </div>
  );
};

export default page;

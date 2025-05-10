import { ArrowRight, Calendar, Check, Clock, MapPin, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FreelancerCardType } from "@/types/types";
import { Card } from "../ui/card";

export function FreelancerCard({ item }: { item: FreelancerCardType }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row">
        <div className="p-4 flex items-center sm:border-r">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`${item.picture}`} />
            <AvatarFallback className="font-bold text-2xl">{item.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1  p-4">
          <div className="flex flex-col sm:flex-row items-start sm:justify-between">
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="flex text-sm text-blue-600">{item.title} <span className="text-gray-900 mx-1">|</span> <span className=" flex items-center gap-1 text-gray-500"><MapPin className="w-4 h-4"/> {item.location}</span></p>
              {/* Availability */}
              <div className="mt-2 mb-2 flex items-center">
                {item.availability === 'available' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Clock className="w-3 h-3 mr-1" />
                    Available now
                  </span>
                )}
                {item.availability === 'limited' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Clock className="w-3 h-3 mr-1" />
                    Limited availability
                  </span>
                )}
                {item.availability === 'unavailable' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <Calendar className="w-3 h-3 mr-1" />
                    Booked until {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 text-sm font-medium text-gray-900">{item.rating}</span>
              </div>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm font-medium text-gray-900">{item.rate}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 my-3">
            {item.skills.map((skill: string) => (
              <span 
                key={skill} 
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-y-2 items-center mt-4 justify-between">
            <div className="mt-0">
              <h4 className="text-sm font-medium text-gray-900 mb-0">Can help with:</h4>
              <ul className="flex items-center flex-wrap gap-x-2 gap-y-1 mb-1 ">
                {item.tasks.map((task: string, i: number) => (
                  <li key={i} className="flex items-start gap-1">
                    <Check className="w-4 h-4 mt-0.5 mr-0 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-500">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button size="sm" className="inline-flex items-center px-4 py-4 border border-transparent text-sm font-medium rounded-md shadow-sm cursor-pointer bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              View profile
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
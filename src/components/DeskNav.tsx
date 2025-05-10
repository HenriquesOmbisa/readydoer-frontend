'use client'

import {
  Bell,
  HelpCircle,
  LogIn,
  LogOut,
  PlusCircle,
  FolderOpen,
  Settings,
  X,
  ChevronDown,
  UserCircle
} from 'lucide-react'
import { CgFeed } from "react-icons/cg";
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Logo from './Logo';
import categoriesData from '@/data/categories.json'
import countriesData from '@/data/countries.json'
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

{/** Base routes for the project  */}
const MainLinks = [
  { name: "Hire", icon: <CgFeed className="w-5 h-5" />, href: "/hire" },
  { name: "Project", icon: <FolderOpen className="w-5 h-5" />, href: "/project" },
]
// Dados de exemplo para sugestões de busca


export default function DeskNav({path}:{path: string}) {
  {/**UI logics booleans */}
  const [scrolled, setScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // simula auth (cliente)
  const [getSearch, setGetSearch] = useState(false)
  const [getLevel, setGetLevel] = useState(false)
  const [getSalary, setGetSalary] = useState(false)
  const [getLocation, setGetLocation] = useState(false)
  const [getUserMenu, setGetUserMenu] = useState(false)
  {/** Refs for the boxs */}
  const searchRef = useRef<HTMLDivElement>(null)
  const levelRef = useRef<HTMLDivElement>(null)
  const salaryRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  {/** State for the search and location */}
  const [searchValue, setSearchValue] = useState('')
  const [mainValue, setMainValue] = useState('Search')
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [locationValue, setLocationValue] = useState('')
  const [mainLocationValue, setMainLocationValue] = useState('Location')
  const [locationSuggestions, setLocationSuggestions] = useState<{countries: string[], regions: string[], subregions: string[]}>({
    countries: [],
    regions: [],
    subregions: []
  })
  const [filterState, setFilterState] = useState<{
    categories: string[];
    levels: string[];
    salaryRange: number;
    locations: string [];
  }>({
    categories: [],
    levels: [],
    salaryRange: 30,
    locations: [],
  })

  useEffect(() => {
    const setSugestions = () => {
      const allSuggestions: string[] = [];
  
      categoriesData.forEach((category) => {
        allSuggestions.push(category.name);
  
        category.subcategories.forEach((subcategory) => {
          allSuggestions.push(subcategory.name);
  
          const skillCategories = Object.keys(subcategory.skills);
          skillCategories.forEach((skillCategory) => {
            allSuggestions.push(skillCategory);
  
            const skills = subcategory.skills[skillCategory as keyof typeof subcategory.skills] as { name: string }[];
            skills.forEach((skill) => {
              allSuggestions.push(skill.name);
  
              // Se quiser pegar as tags e linguagens também
              /*skill.meta?.tags?.forEach((tag: string) => {
                allSuggestions.push(tag);
              });
  
              skill.meta?.languages?.forEach((lang: string) => {
                allSuggestions.push(lang);
              });*/
            });
          });
        });
      });
  
      setSearchSuggestions(allSuggestions);
    };

    const setLocationSuggestionsData = () => {
      const countriesSet = new Set<string>();
      const regionsSet = new Set<string>();
      const subregionsSet = new Set<string>();
    
      countriesData.forEach((country) => {
        if (country.name) countriesSet.add(`${country.flag} ${country.name}`);
        if (country.region) regionsSet.add(country.region);
        if (country.subregion) subregionsSet.add(country.subregion);
      });
    
      const allLocations = {
        countries: Array.from(countriesSet),
        regions: Array.from(regionsSet),
        subregions: Array.from(subregionsSet),
      };
    
      setLocationSuggestions(allLocations);
    };


    setLocationSuggestionsData();
  
    setSugestions();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const handleSearch = (value: string)=>{
    setSearchValue(value)
    if (value === '')
      setMainValue('Search')
    else
      setMainValue(value)


  }

  const onClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (searchRef.current && !searchRef.current.contains(target) ) setGetSearch(false);
    if (levelRef.current && !levelRef.current.contains(target)) setGetLevel(false);
    if (salaryRef.current && !salaryRef.current.contains(target)) setGetSalary(false);
    if (locationRef.current && !locationRef.current.contains(target)) setGetLocation(false);
    if (userMenuRef.current && !userMenuRef.current.contains(target)) setGetUserMenu(false);
  }

  const toggleSelection = (type: 'categories'  | 'levels' | 'salaryRange' | 'locations', value: string ) => {
    setFilterState(prev => {
      if (type === 'salaryRange') {
        const newValue = prev[type] == value as unknown as number ? prev.salaryRange : value as unknown as number;
        return { ...prev, salaryRange: newValue };
      }
      return {
        ...prev,
        [type]: prev[type].includes(value)
          ? prev[type].filter(v => v !== value)
          : [...prev[type], value]
      }
    })
  }

  const removeFilter = (type: keyof typeof filterState, value: string | number) => {
    setFilterState(prev => {
      /*if (type === 'salaryRange') {
        return { ...prev, salaryRange: [0, 200] }
      }*/
      
      return {
        ...prev,
        [type]: (prev[type] as unknown[]).filter(v => v !== value)
      }
    })
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => onClickOutside(e);
    
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const renderUserMenu = () => (
    <div ref={userMenuRef} className="">
      <Avatar className="h-8 w-8 cursor-pointer" onClick={() => setGetUserMenu(!getUserMenu)}>
        <AvatarImage src={``} />
        <AvatarFallback className="font-bold bg-black text-white text-base">{"Henriques Ombisa".charAt(0)}</AvatarFallback>
      </Avatar>
      {getUserMenu && (
        <div className="absolute right-6 bg-white z-50  px-3 w-52 mt-2 sugest-bx-h border border-gray-200 shadow-md rounded-md">
          <div className="flex flex-col space-y-1 py-4">
            <div className="flex items-center gap-1 p-2 rounded-md text-base font-medium hover:bg-gray-100 cursor-pointer truncate" onClick={() => setGetUserMenu(false)}>
              <UserCircle /> Profile
            </div>
            <div className="flex items-center gap-1 p-2 rounded-md text-base font-medium hover:bg-gray-100 cursor-pointer truncate" onClick={() => setGetUserMenu(false)}>
              <FolderOpen /> My projects
            </div>
            <div className="flex items-center gap-1 p-2 rounded-md text-base font-medium hover:bg-gray-100 cursor-pointer truncate" onClick={() => setGetUserMenu(false)}>
              <PlusCircle /> New project
            </div>
            <div className="flex items-center gap-1 p-2 rounded-md text-base font-medium hover:bg-gray-100 cursor-pointer truncate" onClick={() => setGetUserMenu(false)}>
              <HelpCircle /> Help
            </div>
            <div className="flex items-center gap-1 p-2 rounded-md text-base font-medium hover:bg-gray-100 cursor-pointer truncate" onClick={() => setGetUserMenu(false)}>
              <Settings /> Settings
            </div>
            <div className="flex items-center gap-1 p-2 rounded-md text-base font-medium hover:bg-gray-100 cursor-pointer truncate" onClick={() => setGetUserMenu(false)}>
              <LogOut /> Logout
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderMainlinks = () => (
    <div className="hidden md:flex items-center gap-2">
      {MainLinks.map((link) => (
        <Link key={link.name} href={link.href}>
          <Button variant={"ghost"} className={`flex cursor-pointer items-center gap-1 text-base font-bold text-gray-700 hover:bg-blue-100/80 hover:text-blue-500 ${path.includes(link.href) ? 'bg-blue-100/90 text-blue-600' : ''}`} >
            {link.icon}
            {link.name}
          </Button>
        </Link>
      ))}
    </div>
  )
  const renderAuthLinks = () => {
    if (!isLoggedIn) {
      return (
        <div className="flex items-center gap-4">
          {renderMainlinks()}
          <div className="flex items-center gap-2">
            <Link href="/auth/login">
              <Button variant={"ghost"} className="flex font-bold cursor-pointer hover:bg-gray-200 items-center gap-1 text-base">
                <LogIn className="w-5 h-5" />
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className='text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition flex items-center gap-1 shadow-lg shadow-blue-500/20 cursor-pointer'>
                Create Project
                <FolderOpen className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      )
    }

    return (
      <div className="w-full flex items-center gap-2">
        {renderMainlinks()}
        <Button variant="ghost" className="text-gray-700 cursor-pointer hover:bg-blue-100/80 hover:text-blue-500 text-base font-bold">
          <PlusCircle className="w-5 h-5" /> New
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-700  cursor-pointer hover:bg-blue-100/80 hover:text-blue-500 rounded-full w-8 h-8">
          <Bell className="w-5 h-5" />
        </Button>
        {renderUserMenu()}
      </div>
    )
  }

  function handleLocation(value: string): void {
    setLocationValue(value)
    if (value === '')
      setMainValue('Search')
    
  }


  const searchFilter = () => (
    <div ref={searchRef} className="relative w-36 h-9 ml-0">
      <div className={`absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur  ${getSearch ? "opacity-40" : "opacity-0"} transition duration-200`}
      />
      <div
        className={`bg-white py-2 border-2 relative flex items-center justify-between w-full h-full gap-2 rounded-full px-2
          ${getSearch ? "border-blue-200" : "hover:bg-gray-100"}`}
        onClick={() => setGetSearch(true)}
      >
        <div className={`${!getSearch ? 'flex' : 'hidden'} w-full items-center justify-between font-black`}>
          <div className="flex items-center gap-1 select-none">
            {mainValue === 'Search' && "🔍 "}
            {mainValue}
          </div>
          <ChevronDown className='text-gray-500 w-4 h-4' strokeWidth={4} />
        </div>
        {getSearch && (
          <div className="relative flex items-center justify-between h-full w-full gap-2 px-2">
            <input
              type="text"
              placeholder="Type"
              value={searchValue}
              name='find'
              autoFocus
              onChange={(e) => handleSearch(e.target.value)}
              className="relative flex-1 border-none w-full indent-0 rounded-sm focus:ring-0 focus:outline-none font-black placeholder:text-foreground placeholder:font-black"
            />
            <ChevronDown className='absolute z-10 right-0 bg-white text-gray-500 w-4 h-4' strokeWidth={4} />
          </div>
        )}
      </div>
      {getSearch && (
        <div className="absolute bg-gray-100/80 z-50 w-sm mt-2 sugest-bx-h border border-gray-200 shadow-md rounded-md">
          <div className="backdrop-blur-sm py-4">
            {searchSuggestions
              .filter((sug) =>
                sug.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((sug, index) => (
                <div
                  key={index}
                  className="px-3 py-1 rounded-none text-lg font-bold hover:bg-gray-300/60 cursor-pointer truncate"
                  onClick={() => {
                    setMainValue("Search");
                    setSearchValue('');
                    setGetSearch(false);
                    toggleSelection('categories', sug);
                  }}
                >
                  {sug}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )

  const locationFilter = () => (
    <div ref={locationRef} className="relative w-36 h-9 ml-0">
      <div className={`absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur  ${getLocation ? "opacity-40" : "opacity-0"} transition duration-200`}
      />
      <div
        className={`bg-white py-2 border-2 relative flex items-center justify-between w-full h-full gap-2 rounded-full px-2
          ${getLocation ? "border-blue-200" : "hover:bg-gray-100"}`}
        onClick={() => setGetLocation(true)}
      >
        <div className={`${!getLocation ? 'flex' : 'hidden'} w-full items-center justify-between font-black`}>
          <div className="flex items-center gap-1 select-none">
            {mainValue === 'Search' && "🌍 "}
            {mainLocationValue}
          </div>
          <ChevronDown className='text-gray-500 w-4 h-4' strokeWidth={4} />
        </div>
        {getLocation && (
          <div className="relative flex items-center justify-between h-full w-full gap-2 px-2">
            <input
              type="text"
              placeholder="Type"
              value={locationValue}
              name='find'
              autoFocus
              onChange={(e) => handleLocation(e.target.value)}
              className="relative flex-1 border-none w-full indent-0 rounded-sm focus:ring-0 focus:outline-none font-black placeholder:text-foreground placeholder:font-black"
            />
            <ChevronDown className='absolute z-10 right-0 bg-white text-gray-500 w-4 h-4' strokeWidth={4} />
          </div>
        )}
      </div>
      {getLocation && (
        <div className="absolute bg-gray-100/80 z-50 w-sm mt-2 sugest-bx-h border border-gray-200 shadow-md rounded-md">
          <div className="backdrop-blur-sm py-4">
            <span className="text-2xl font-black">Countries</span>
            {locationSuggestions.countries
              .filter((sug) =>
                sug.toLowerCase().includes(locationValue.toLowerCase())
              )
              .map((sug, index) => (
                <div
                  key={index}
                  className="px-3 py-1 rounded-none text-lg font-bold hover:bg-gray-300/60 cursor-pointer truncate"
                  onClick={() => {
                    setMainLocationValue("Location");
                    setLocationValue('');
                    toggleSelection('locations', sug);
                    setGetLocation(false);
                  }}
                >
                  {sug}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )

  const experinceeFilter = () => (
    <div ref={levelRef} className="relative w-40 h-9 ml-0">
      <div  className={`absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur  ${getLevel ? "opacity-40" : "opacity-0"} transition duration-200`}
        />
      <div
        className={`py-2 border-2 relative flex items-center justify-between w-full h-full gap-2 hover:bg-gray-100 rounded-full px-2  ${getLevel ? "bg-gray-100" : "bg-white"}`}
        onClick={() => setGetLevel(true)}
      >
        <div className={`flex w-full items-center justify-between font-black`}>
          <div className="flex items-center gap-1 select-none">
          📈 Experience
          </div>
          <ChevronDown className='text-gray-500 w-4 h-4' strokeWidth={4} />
        </div>
      </div>
      {getLevel && (
        <div className="absolute bg-gray-100/80 z-50 min-w-40 mt-2 h-max border border-gray-200 shadow-md rounded-md py-4">
          <div className="backdrop-blur-sm ">
            {['👶 Beginner', '👨‍💻 Intermediate', '👴 Advanced'].map((level) => (
                <div
                  key={level}
                  className="px-3 py-1 rounded-none text-lg font-bold hover:bg-gray-300/60 cursor-pointer truncate"
                  onClick={() => { toggleSelection('levels', level); setGetLevel(false);}}
                >
                  {level}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )

  const SalaryFilter = () => (
    <div ref={salaryRef} className={` relative w-44 h-9`}>
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur 
          ${getSalary ? "opacity-40" : "opacity-0"} transition duration-200`}
      />
      <div
        className={`py-2 border-2 relative flex items-center justify-between w-full h-full gap-2 rounded-full px-2 
        ${getSalary ? "bg-gray-100" : "bg-white hover:bg-gray-100"}`}
        onClick={() => setGetSalary(!getSalary)}
      >
        <div className="flex w-full items-center justify-between font-bold">
          <div className="flex items-center gap-1 select-none">
            💰 Salary: &nbsp;${filterState.salaryRange}/h
          </div>
          <ChevronDown className="text-gray-500 w-4 h-4" strokeWidth={4} />
        </div>
      </div>
      {getSalary && (
        <div className="absolute z-50 w-full mt-2 bg-gray-100/80 backdrop-blur-md border border-gray-200 shadow-md rounded-md px-4 py-4">
          <Slider
            defaultValue={[filterState.salaryRange as number]}
            min={10}
            max={250}
            step={5}
            onValueChange={(value) => {
              setFilterState((prev) => ({
                ...prev,
                salaryRange: value[0],
              }));
            }}
            onValueCommit={() => {
              setGetSalary(false); // Fecha a box depois da seleção
            }}
          />
          <div className="text-xs mt-2 text-center font-bold text-muted-foreground">
            Between ${filterState.salaryRange} and $200 per hour
          </div>
        </div>
      )}
    </div>
  )



  return (
    <nav className={`bg-gray-50/40 mb-6 backdrop-blur-sm h-max py-2 pt-5 sticky top-0 z-30 transition-all ${scrolled ? 'border-b border-gray-200 ' : ''}`}>
      <div className=" h-max mx-auto px-8">
        <div className={`${isLoggedIn ? "block md:flex" : "flex"} items-center justify-between h-max`}>
          <div className="flex items-center gap-0">
            <div className="md:hidden">
            </div>
            <div className="mr-4">
              <Logo />
            </div>
            
            <div className="flex items-center gap-2">
              {/* Search filter */}
              {searchFilter()}

              {/* Experience filter */}
              {experinceeFilter()}

              {/* Salary filter */}
              { path.includes("/project") ? null : SalaryFilter() }

              {/* Location filter */}
              {locationFilter()}

            </div>

            </div>
          
          
          <div className="hidden md:flex items-center gap-4">
            {renderAuthLinks()}
          </div>
        </div>
        {/**Sub Menu */}
        <div className={`flex pt-3 flex-wrap gap-2`}>
          
          {filterState.levels.map(level => (
            <Badge key={level} variant={"outline"} className="flex items-center text-base border-gray-300 bg-white font-bold py-1 px-2 gap-1 rounded-full">
              {level}
              <button onClick={() => removeFilter('levels', level)}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filterState.categories.map(category => (
            <Badge key={category} variant={"outline"} className="flex items-center text-base border-gray-300 bg-white font-bold py-1 px-2 gap-1 rounded-full">
              {category}
              <button onClick={() => removeFilter('categories', category)}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filterState.locations.map(location => (
            <Badge key={location} variant={"outline"} className="flex items-center text-base border-gray-300 bg-white font-bold py-1 px-2 gap-1 rounded-full">
              {location}
              <button onClick={() => removeFilter('locations', location)}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </nav>
  )
}
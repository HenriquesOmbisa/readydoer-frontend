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
  UserCircle,
  Menu,
  Search,
  Globe
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
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

const MainLinks = [
  { name: "Hire", icon: <CgFeed className="w-5 h-5" />, href: "/hire" },
  { name: "Projects", icon: <FolderOpen className="w-5 h-5" />, href: "/projects" },
];

// Dados de exemplo para sugestões (pode substituir pelos seus dados reais)
const allSkills = categoriesData.flatMap(category => [
  category.name,
  ...category.subcategories.flatMap(sub => [
    sub.name,
    ...Object.keys(sub.skills).flatMap(skillCat => 
      sub.skills[skillCat as keyof typeof sub.skills].map((s: any) => s.name)
    )
  ])
]);

const allLocations = countriesData.map(country => 
  `${country.flag} ${country.name}`
);

export default function MobileNav({path}:{path: string}) {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filterState, setFilterState] = useState({
    categories: [] as string[],
    levels: [] as string[],
    salaryRange: 30,
    locations: [] as string[],
  });

  // Refs para detectar clicks fora
  const searchRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Efeito para scroll e click outside
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
        setMobileSearchOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filtra sugestões de busca
  const filteredSearchSuggestions = allSkills.filter(skill =>
    skill.toLowerCase().includes(searchValue.toLowerCase())
  ).slice(0, 5);

  // Filtra sugestões de localização
  const filteredLocationSuggestions = allLocations.filter(location =>
    location.toLowerCase().includes(locationValue.toLowerCase())
  ).slice(0, 5);

  // Funções de filtro
  const toggleSelection = (type: 'categories' | 'levels' | 'locations', value: string) => {
    setFilterState(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  const removeFilter = (type: keyof typeof filterState, value: string) => {
    setFilterState(prev => ({
      ...prev,
      [type]: (prev[type] as string[]).filter(v => v !== value)
    }));
  };

  // Componente de sugestões de busca
  const SearchSuggestions = () => (
    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 shadow-lg rounded-md max-h-60 overflow-y-auto">
      {filteredSearchSuggestions.length > 0 ? (
        filteredSearchSuggestions.map((suggestion, index) => (
          <div
            key={index}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSearchValue("");
              setLocationValue("");
              toggleSelection('categories', suggestion);
              setShowSearchSuggestions(false);
              setMobileSearchOpen(false);
            }}
          >
            {suggestion}
          </div>
        ))
      ) : (
        <div className="px-4 py-2 text-gray-500">No matches found</div>
      )}
    </div>
  );

  // Componente de sugestões de localização
  const LocationSuggestions = () => (
    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 shadow-lg rounded-md max-h-60 overflow-y-auto">
      {filteredLocationSuggestions.length > 0 ? (
        filteredLocationSuggestions.map((suggestion, index) => (
          <div
            key={index}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setLocationValue("");
              setSearchValue("");
              toggleSelection('locations', suggestion);
              setShowLocationSuggestions(false);
              setMobileSearchOpen(false);
            }}
          >
            {suggestion}
          </div>
        ))
      ) : (
        <div className="px-4 py-2 text-gray-500">No locations found</div>
      )}
    </div>
  );
  
    const renderAuthLinks = () => {
      if (!isLoggedIn) {
        return (
          <div className="flex flex-col gap-2 mt-0">
            <Link href="/auth/login">
              <Button variant="outline" className="w-full justify-start gap-2">
                <LogIn className="w-5 h-5" />
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="w-full justify-start gap-2 bg-gradient-to-r from-blue-600 to-indigo-600">
                <FolderOpen className="w-5 h-5" />
                Create Project
              </Button>
            </Link>
          </div>
        );
      }
  
      return (
        <div className="mt-0">
          <div className="flex items-center gap-3 p-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={``} />
          <AvatarFallback className="font-bold bg-black text-white text-base">{"H"}</AvatarFallback>
        </Avatar>
        <span className="font-bold">Henriques Ombisa</span>
      </div>
      <div className="flex flex-col space-y-1 mt-2">
        <Link href="/profile" className="flex items-center gap-3 p-2 rounded-md text-base font-medium hover:bg-gray-100">
          <UserCircle className="w-5 h-5" /> Profile
        </Link>
        <Link href="/projects" className="flex items-center gap-3 p-2 rounded-md text-base font-medium hover:bg-gray-100">
          <FolderOpen className="w-5 h-5" /> My projects
        </Link>
        <Link href="/new-project" className="flex items-center gap-3 p-2 rounded-md text-base font-medium hover:bg-gray-100">
          <PlusCircle className="w-5 h-5" /> New project
        </Link>
        <Link href="/help" className="flex items-center gap-3 p-2 rounded-md text-base font-medium hover:bg-gray-100">
          <HelpCircle className="w-5 h-5" /> Help
        </Link>
        <Link href="/settings" className="flex items-center gap-3 p-2 rounded-md text-base font-medium hover:bg-gray-100">
          <Settings className="w-5 h-5" /> Settings
        </Link>
        <button className="flex border-none outline-none items-center gap-3 p-2 rounded-md text-base font-medium hover:bg-gray-100 text-left">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
          
        </div>
      );
    };
  
    const renderMainLinks = () => (
      <div className="flex flex-col gap-1 mt-0">
        {MainLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            className="flex items-center gap-3 p-2 rounded-md text-base font-medium hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </div>
    );

  // Renderização dos filtros avançados
  const renderFilters = () => (
    <div ref={searchRef} className="p-4">
      {/* Campo de busca com sugestões */}
      <div className="mb-4 relative">
        <h3 className="font-bold mb-2">Search Skills</h3>
        <div className="relative">
          <Input 
            placeholder="Type a skill..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setShowSearchSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowSearchSuggestions(searchValue.length > 0)}
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {showSearchSuggestions && <SearchSuggestions />}
      </div>

      {/* Campo de localização com sugestões */}
      <div className="mb-4 relative" ref={locationRef}>
        <h3 className="font-bold mb-2">Location</h3>
        <div className="relative">
          <Input 
            placeholder="Search location..."
            value={locationValue}
            onChange={(e) => {
              setLocationValue(e.target.value);
              setShowLocationSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowLocationSuggestions(locationValue.length > 0)}
          />
          <Globe className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {showLocationSuggestions && <LocationSuggestions />}
      </div>

      {/* Outros filtros (nível, salário) */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Experience Level</h3>
        <div className="flex flex-col gap-2">
          {['👶 Beginner', '👨‍💻 Intermediate', '👴 Advanced'].map((level) => (
            <Button 
              key={level}
              variant={filterState.levels.includes(level) ? "default" : "outline"}
              className="justify-start"
              onClick={() => {
                toggleSelection('levels', level);
                setSearchValue("");
                setLocationValue("");
                setMobileSearchOpen(false);
              }}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>
      
      <div className={`${path.includes("/projects") ? 'hidden': ''}  mb-4`}>
        <h3 className="font-bold mb-2">Salary Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={[filterState.salaryRange]}
            min={10}
            max={250}
            step={5}
            onValueChange={(value) => {
              setFilterState(prev => ({
                ...prev,
                salaryRange: value[0]
              }));
            }}
            onValueCommit={() => {
              setMobileSearchOpen(false);
            }}
          />
          <div className="text-center mt-2 font-medium">
            ${filterState.salaryRange}/h
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <nav className={`bg-gray-50/80 backdrop-blur-sm sticky top-0 z-50 transition-all ${scrolled ? 'border-b border-gray-200' : ''}`}>
      {/* Top Bar (igual ao anterior) */}
      <div className="flex items-center justify-between p-4">
        {/* Logo and Menu Button */}
        <div className="flex items-center gap-4">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className='outline-none'>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4 w-[300px] sm:w-[350px] overflow-y-auto">
              <div className="mt-4">
                <Logo />
              </div>
              {renderMainLinks()}
              {renderAuthLinks()}
            </SheetContent>
          </Sheet>
          
          <Logo />
        </div>

        {/* Search and User Actions */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={``} />
                <AvatarFallback className="font-bold bg-black text-white text-sm">{"H"}</AvatarFallback>
              </Avatar>
            </>
          ) : (
            <Link href="/auth/login">
              <Button variant="outline" size="sm" className="hidden sm:flex gap-1">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Search Panel */}
      {mobileSearchOpen && (
        <div ref={searchRef} className="p-4 border-t border-gray-200 bg-white">
          <div className="relative mb-3">
            <Input 
              placeholder="Search skills, projects..."
              className="pl-10"
              autoFocus
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setShowSearchSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => setShowSearchSuggestions(searchValue.length > 0)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            {showSearchSuggestions && <SearchSuggestions />}
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Advanced Search
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <ScrollArea className="h-full">
                {renderFilters()}
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* Active Filters (igual ao anterior) */}
      <div className="px-4 pb-2 flex flex-wrap gap-2 overflow-x-auto">
              {[...filterState.levels, ...filterState.categories, ...filterState.locations].map((item) => (
                <Badge 
                  key={item} 
                  variant="outline" 
                  className="flex items-center gap-1 py-1 px-2 rounded-full"
                >
                  {item}
                  <button onClick={() => {
                    if (filterState.levels.includes(item)) removeFilter('levels', item);
                    else if (filterState.categories.includes(item)) removeFilter('categories', item);
                    else removeFilter('locations', item);
                  }}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {filterState.salaryRange > 10 && (
                <Badge variant="outline" className="flex items-center gap-1 py-1 px-2 rounded-full">
                  💰 ${filterState.salaryRange}/h
                  <button onClick={() => setFilterState(prev => ({...prev, salaryRange: 10}))}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
    </nav>
  );
}
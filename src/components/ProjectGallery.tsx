import React, { useState } from 'react';
import { PROJECTS_GALLERY } from '../data';
import { ProjectItem } from '../types';
import { Eye, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'residential' | 'commercial' | 'industrial' | 'repairs' | 'waterproofing'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [showAfterMap, setShowAfterMap] = useState<Record<string, boolean>>({});

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'residential', label: 'Residential Roofing' },
    { value: 'commercial', label: 'Commercial Roofing' },
    { value: 'industrial', label: 'Industrial Roofing' },
    { value: 'repairs', label: 'Roof Repairs' },
    { value: 'waterproofing', label: 'Waterproofing Projects' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_GALLERY
    : PROJECTS_GALLERY.filter(p => p.category === activeCategory);

  const toggleBeforeAfter = (projectId: string) => {
    setShowAfterMap(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  return (
    <div className="space-y-8" id="projects-gallery-section">
      {/* Category Selection Filter pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-6" id="project-filters">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value as any)}
            className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm ${
              activeCategory === cat.value
                ? 'bg-[#B71510] text-white shadow-md scale-105'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" id="project-masonry-grid">
        {filteredProjects.map((project, idx) => {
          const isShowingAfter = showAfterMap[project.id] !== false; // default to showing after
          const activeImage = isShowingAfter ? project.afterImg : project.beforeImg;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-md border border-slate-200 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-slate-300"
              id={`project-card-${project.id}`}
            >
              {/* Image Frame with interactive Before/After badge */}
              <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                <img
                  src={activeImage}
                  alt={project.title}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Overlays and Badges */}
                <div className="absolute top-3 left-3 rounded bg-slate-950/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                  {project.location}
                </div>

                <div className="absolute bottom-3 right-3 z-10 flex gap-1.5">
                  <button
                    onClick={() => toggleBeforeAfter(project.id)}
                    className="rounded-lg bg-slate-950/90 px-3 py-1.5 text-[11px] font-bold text-white shadow-lg hover:bg-slate-900 active:scale-95 flex items-center gap-1 transition-all border border-slate-700"
                  >
                    <Sliders className="h-3 w-3 text-[#F96302]" />
                    Showing: <strong className="text-[#F96302] uppercase">{isShowingAfter ? 'Finished' : 'Before'}</strong>
                  </button>
                </div>

                {/* Subtle Hover Overlay with full description trigger */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full rounded-lg bg-[#B71510] py-2.5 text-center text-xs font-bold text-white uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#9c120d] transition-all shadow-md"
                  >
                    <Eye className="h-4 w-4" />
                    Inspect Before & After Case Study
                  </button>
                </div>
              </div>

              {/* Text metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                    <span className="uppercase tracking-widest text-[#B71510] font-bold">{project.category}</span>
                  </div>
                  <h4 className="font-sans font-bold text-slate-900 text-base group-hover:text-[#B71510] transition-colors line-clamp-1">
                    {project.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold text-[#B71510] hover:text-[#9c120d] flex items-center gap-1 transition-colors"
                  >
                    View Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[10px] bg-orange-50 text-[#F96302] border border-orange-200 px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="h-3 w-3 text-[#F96302]" /> Guaranteed
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* LIGHTBOX CASE STUDY MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 overflow-y-auto backdrop-blur-sm" id="project-lightbox-modal">
          <div className="relative w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl space-y-6 border border-slate-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">{selectedProject.category} Project</span>
                <h3 className="text-xl font-black text-slate-900">{selectedProject.title}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <span>📍 {selectedProject.location}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900 focus:outline-none transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Side-by-Side Before & After comparison columns */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              
              {/* Before Column */}
              <div className="space-y-2">
                <span className="inline-block text-xs font-bold uppercase text-slate-600 tracking-wider px-2.5 py-1 bg-slate-100 rounded">
                  Before Restoration
                </span>
                <div className="relative h-64 overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
                  <img
                    src={selectedProject.beforeImg}
                    alt="Before State"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-xs text-slate-500 italic">
                  Showing original weathering, structural rust, tile erosion or leak points before our mastercraft team intervention.
                </p>
              </div>

              {/* After Column */}
              <div className="space-y-2">
                <span className="inline-block text-xs font-bold uppercase text-[#F96302] tracking-wider px-2.5 py-1 bg-orange-50 border border-orange-200 rounded">
                  After Completion (Guaranteed)
                </span>
                <div className="relative h-64 overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
                  <img
                    src={selectedProject.afterImg}
                    alt="After State"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-xs text-[#F96302] font-semibold">
                  ✓ Premium new Chromadek or tiles, robust flashing repairs, and multi-layer weather-tight seal.
                </p>
              </div>

            </div>

            {/* Case Study Summary Text */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">Project Scope & Deliverables</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedProject.description} At New Roofing Solution, we back this work with premium engineering specs and a comprehensive multi-year workmanship warranty to ensure lasting peace of mind.
              </p>
            </div>

            {/* CTA in Modal */}
            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedProject(null)}
                className="rounded-lg bg-slate-100 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 mr-2 transition-colors"
              >
                Close Case Study
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// Simple internal SVG close icon
function X({ className, ...props }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

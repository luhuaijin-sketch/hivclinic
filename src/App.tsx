/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, BookOpen, ChevronRight, Heart, Shield, Activity, Info, Menu, X, Clock, User, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { articles, Article, categories } from './data/articles';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoriesWithIcons = [
    { name: 'About HIV', icon: Info },
    { name: 'Prevention', icon: Shield },
    { name: 'Testing', icon: Activity },
    { name: 'Treatment', icon: Heart },
    { name: 'Living with HIV', icon: BookOpen },
    { name: 'Resources', icon: BookOpen },
    { name: 'Blog', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setSelectedArticle(null); setSelectedCategory(null); }}>
              <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-200">
                <Activity size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">HIVClinic<span className="text-red-600">.org</span></span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {categoriesWithIcons.slice(0, 4).map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => { setSelectedCategory(cat.name); setSelectedArticle(null); }}
                  className={`text-sm font-medium transition-colors hover:text-red-600 ${selectedCategory === cat.name ? 'text-red-600' : 'text-slate-600'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-red-500 transition-all w-64"
                />
              </div>
              <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {categoriesWithIcons.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => { setSelectedCategory(cat.name); setSelectedArticle(null); setIsMenuOpen(false); }}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600 rounded-lg"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {selectedArticle ? (
            <motion.div
              key="article-detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="mb-8 flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors group"
              >
                <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={20} />
                Back to articles
              </button>

              <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    {selectedArticle.subcategory}
                  </span>
                  <span className="text-slate-400 text-sm flex items-center gap-1">
                    <Clock size={14} /> {selectedArticle.readTime}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
                  {selectedArticle.title}
                </h1>

                <div className="flex items-center gap-6 mb-12 pb-8 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{selectedArticle.author}</p>
                      <p className="text-xs text-slate-500">Medical Expert</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={16} />
                    <span className="text-sm">{new Date(selectedArticle.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>

                <div 
                  className="prose prose-slate prose-lg max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight 
                    prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
                    prose-p:leading-relaxed prose-p:text-slate-600
                    prose-li:text-slate-600"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="article-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              {!selectedCategory && !searchQuery && (
                <div className="mb-16 text-center py-12">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6"
                  >
                    Knowledge is <span className="text-red-600">Power</span>.
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
                  >
                    Access the latest evidence-based information on HIV prevention, testing, and treatment from leading medical experts.
                  </motion.p>
                </div>
              )}

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3 mb-12 justify-center">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${!selectedCategory ? 'bg-slate-900 text-white shadow-slate-400' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
                >
                  All Articles
                </button>
                {categoriesWithIcons.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${selectedCategory === cat.name ? 'bg-red-600 text-white shadow-red-200' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
                  >
                    <cat.icon size={16} />
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Article Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedArticle(article)}
                    className="group bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 cursor-pointer hover:shadow-2xl hover:shadow-red-100 hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {article.subcategory}
                      </span>
                      <span className="text-slate-400 text-[10px] flex items-center gap-1 font-medium">
                        <Clock size={12} /> {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-6">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                          <User size={12} />
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{article.author}</span>
                      </div>
                      <ChevronRight className="text-slate-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all" size={18} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-24">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
                    <Search size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No articles found</h3>
                  <p className="text-slate-500">Try adjusting your search or category filters.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white">
                  <Activity size={20} />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">HIVClinic<span className="text-red-600">.org</span></span>
              </div>
              <p className="max-w-sm leading-relaxed">
                Providing accurate, up-to-date, and evidence-based information to empower individuals and communities in the fight against HIV.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Connect</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            <p>&copy; 2026 HIVClinic.org. All rights reserved. Information provided is for educational purposes and not a substitute for professional medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


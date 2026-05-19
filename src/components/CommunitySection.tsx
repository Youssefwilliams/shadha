import React, { useState } from "react";
import { EDUCATIONAL_ARTICLES, MOCK_COMMUNITY_POSTS, PRESET_PERFUMES } from "../data";
import { EducationalArticle, CommunityPost } from "../types";
import { BookOpen, MessagesSquare, ThumbsUp, MessageCircle, Send, Star, User, Calendar, X, Sparkles, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CommunitySection() {
  const [activeTab, setActiveTab] = useState<"feed" | "articles">("feed");
  const [articles, setArticles] = useState<EducationalArticle[]>(EDUCATIONAL_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null);

  // Community posts state
  const [posts, setPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
  
  // Custom Reviews state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewPerfume, setReviewPerfume] = useState(PRESET_PERFUMES[0].name);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewContent, setReviewContent] = useState("");
  
  // Quick comments popup
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [postComments, setPostComments] = useState<Record<string, { author: string; content: string }[]>>({
    "post-1": [
      { author: "أنس الحربي", content: "دمج العود مع توم فورد فكرة عبقرية سأجربها الليلة!" },
      { author: "ليلى محمد", content: "أوافقك الرأي تماماً، الثبات يصبح استثنائياً." }
    ]
  });

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
          likedByUser: !post.likedByUser
        };
      }
      return post;
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewContent.trim()) return;

    const newPost: CommunityPost = {
      id: "userpost-" + Date.now(),
      author: "عاشق الشذى (أنت)",
      authorAvatar: "👑",
      content: reviewContent,
      perfumeName: reviewPerfume,
      rating: reviewRating,
      likes: 0,
      likedByUser: false,
      commentsCount: 0,
      createdAt: "الآن"
    };

    setPosts([newPost, ...posts]);
    setReviewContent("");
    setShowReviewForm(false);
  };

  const handleAddComment = (postId: string) => {
    if (!newCommentText.trim()) return;
    const existing = postComments[postId] || [];
    setPostComments({
      ...postComments,
      [postId]: [...existing, { author: "أنت", content: newCommentText }]
    });
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, commentsCount: p.commentsCount + 1 };
      }
      return p;
    }));
    setNewCommentText("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Category Tabs */}
      <div className="flex border-b border-[#E5E1DA] mb-8 justify-center gap-6">
        <button
          onClick={() => setActiveTab("feed")}
          className={`pb-4 px-2 text-sm font-semibold relative transition-colors cursor-pointer ${activeTab === "feed" ? "text-[#D4AF37] font-bold" : "text-[#8E8E8E] hover:text-[#1A1A1A]"}`}
        >
          <span className="flex items-center gap-2 flex-row-reverse">
            <MessagesSquare className="w-4 h-4" />
            <span>مجلس العطور للتفاعل</span>
          </span>
          {activeTab === "feed" && (
            <motion.div layoutId="communityTabBorder" className="absolute bottom-0 inset-x-0 h-0.5 bg-[#D4AF37]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("articles")}
          className={`pb-4 px-2 text-sm font-semibold relative transition-colors cursor-pointer ${activeTab === "articles" ? "text-[#D4AF37] font-bold" : "text-[#8E8E8E] hover:text-[#1A1A1A]"}`}
        >
          <span className="flex items-center gap-2 flex-row-reverse">
            <BookOpen className="w-4 h-4" />
            <span>المدونة والمقالات الأسبوعية</span>
          </span>
          {activeTab === "articles" && (
            <motion.div layoutId="communityTabBorder" className="absolute bottom-0 inset-x-0 h-0.5 bg-[#D4AF37]" />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "feed" ? (
          <motion.div
            key="feed-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Action Bar */}
            <div className="flex justify-between items-center gap-4 flex-row-reverse">
              <button
                id="btn-open-review-form"
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="py-2.5 px-5 rounded-xl bg-[#D4AF37] hover:bg-[#C29D2C] text-white font-bold text-xs shadow-sm transition duration-300 flex items-center gap-2 flex-row-reverse cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>شارك مراجعتك وعطرك اليوم</span>
              </button>
              <span className="text-xs text-[#8E8E8E] italic text-right">تبادل الآراء والتجارب العطرية الفورية مع الخبراء</span>
            </div>

            {/* Quick Review Form */}
            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-white border border-[#E5E1DA] rounded-2xl p-5 shadow-sm text-right"
              >
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#555555] mb-2 font-semibold">اسم العطر المعني بالتجربة</label>
                      <select
                        value={reviewPerfume}
                        onChange={(e) => setReviewPerfume(e.target.value)}
                        className="w-full py-2 px-3 bg-white border border-[#E5E1DA] text-[#D4AF37] text-xs rounded-lg focus:outline-none"
                      >
                        {PRESET_PERFUMES.map((p, idx) => (
                          <option key={idx} value={p.name}>{p.name} ({p.brand})</option>
                        ))}
                        <option value="عطر آخر">عطر راقٍ آخر</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-[#555555] mb-2 font-semibold">تقييمك الشخصي له</label>
                      <div className="flex gap-1.5 items-center justify-end py-1 flex-row-reverse">
                        {[1, 2, 3, 4, 5].map(starIdx => (
                          <button
                            key={starIdx}
                            type="button"
                            onClick={() => setReviewRating(starIdx)}
                            className="text-lg focus:outline-none cursor-pointer text-right"
                          >
                            <Star className={`w-5 h-5 ${starIdx <= reviewRating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#E5E1DA]"}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#555555] mb-2 font-semibold">انطباعك ورائحة النوتات التي شعرت بها</label>
                    <textarea
                      id="text-review"
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      placeholder="كيف تصف رائحة العطر؟ هل هو زهري أم حاد؟ متى تستخدمه وما نسبة ثباته على ملابسك؟"
                      rows={3}
                      required
                      className="w-full p-3 bg-white border border-[#E5E1DA] text-xs rounded-lg focus:outline-none focus:border-[#D4AF37] text-[#2D2D2D] placeholder-[#8E8E8E] text-right"
                    />
                  </div>

                  <div className="flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="py-2 px-4 rounded-lg border border-[#E5E1DA] text-[#555555] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] text-xs cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      id="btn-post-review"
                      type="submit"
                      className="py-2 px-5 rounded-lg bg-[#D4AF37] text-white font-semibold text-xs transition hover:bg-[#C29D2C] cursor-pointer shadow-sm"
                    >
                      انشر المراجعة (+30 نقطة)
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Posts Grid Feed */}
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="bg-white border border-[#E5E1DA] rounded-3xl p-5 md:p-6 text-right shadow-sm">
                  {/* Post head */}
                  <div className="flex justify-between items-start flex-row-reverse mb-4">
                    <div className="flex items-center gap-3 flex-row-reverse">
                      <span className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E5E1DA] flex items-center justify-center text-xl shadow-sm">
                        {post.authorAvatar}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-[#1A1A1A] flex items-center justify-end gap-1.5 font-display">
                          {post.author}
                          {post.authorAvatar === "👑" && (
                            <span className="text-[8px] uppercase tracking-wider bg-[#FAF8F5] text-[#D4AF37] border border-[#D4AF37]/30 rounded-full px-1.5 font-semibold">أنت</span>
                          )}
                        </h4>
                        <span className="text-[10px] text-[#8E8E8E]">{post.createdAt}</span>
                      </div>
                    </div>

                    {post.perfumeName && (
                      <span className="py-1 px-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5E1DA] text-[10px] text-[#D4AF37] font-semibold font-display font-sans">
                        🏷️ {post.perfumeName}
                      </span>
                    )}
                  </div>

                  {/* Rating Stars if appropriate */}
                  {post.rating && (
                    <div className="flex gap-0.5 justify-end mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(post.rating || 0) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#E5E1DA]"}`} />
                      ))}
                    </div>
                  )}

                  {/* Body Text */}
                  <p className="text-[#2D2D2D] text-xs md:text-sm leading-relaxed mb-4 whitespace-pre-line font-light font-sans font-sans">
                    {post.content}
                  </p>

                  {/* Footer Interaction elements */}
                  <div className="flex justify-between border-t border-[#F0EEEA] pt-3 flex-row-reverse">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 text-[11px] transition-colors cursor-pointer flex-row-reverse ${post.likedByUser ? "text-[#D4AF37] font-bold" : "text-[#555555] hover:text-[#1A1A1A]"}`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${post.likedByUser ? "fill-current" : ""}`} />
                      <span>{post.likes} تفاعل</span>
                    </button>

                    <button
                      onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 text-[#555555] hover:text-[#1A1A1A] text-[11px] transition-colors cursor-pointer flex-row-reverse"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.commentsCount} تعليق</span>
                    </button>
                  </div>

                  {/* Dynamic Comments Box */}
                  {activeCommentPostId === post.id && (
                    <div className="mt-4 pt-4 border-t border-[#F0EEEA] space-y-3 bg-[#FAF8F5] p-4 rounded-xl border border-[#D4AF37]/10">
                      {/* Comments feed */}
                      {(postComments[post.id] || []).map((comment, cIdx) => (
                        <div key={cIdx} className="text-right text-xs bg-white p-2.5 rounded-lg border border-[#E5E1DA]">
                          <span className="block font-bold text-[#D4AF37] mb-1">{comment.author}:</span>
                          <span className="text-[#2D2D2D] font-light font-sans">{comment.content}</span>
                        </div>
                      ))}

                      {/* Comment Input */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="px-3 bg-[#FAF8F5] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-white hover:border-transparent transition rounded-lg border border-[#E5E1DA] flex items-center justify-center cursor-pointer font-sans"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                        <input
                          id={`input-post-comment-${post.id}`}
                          type="text"
                          placeholder="اكتب ردك ومناقشتك الهادفة..."
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          className="flex-1 py-1.5 px-3 bg-white border border-[#E5E1DA] rounded-lg text-xs text-[#2D2D2D] focus:outline-none focus:border-[#D4AF37] placeholder-[#8E8E8E] text-right"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="articles-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {articles.map(article => (
              <div 
                key={article.id} 
                onClick={() => setSelectedArticle(article)}
                className="bg-white border border-[#E5E1DA] hover:border-[#D4AF37] rounded-3xl overflow-hidden shadow-sm duration-300 hover:scale-[1.01] flex flex-col cursor-pointer text-right"
              >
                {/* Article Header Image */}
                <div className="relative h-44 bg-[#F9F8F6] overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 right-3 bg-white/95 border border-[#E5E1DA] text-[10px] text-[#D4AF37] px-3 py-1 rounded-full text-right font-semibold font-sans">
                    🔑 {article.readTime}
                  </span>
                </div>

                {/* Article Text */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1.5 text-[9px] text-[#8E8E8E] mb-2 flex-row-reverse font-sans">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>بإمضاء: {article.author.split(" ")[0]}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#1A1A1A] mb-2 leading-snug line-clamp-2 font-serif">{article.title}</h3>
                    <p className="text-[#555555] text-xs leading-relaxed line-clamp-3 font-light mb-4 font-sans">{article.summary}</p>
                  </div>

                  <span className="text-[10px] text-[#D4AF37] font-bold flex items-center justify-end gap-1 flex-row-reverse hover:underline font-sans">
                    <span>اقرأ القصة الكاملة</span>
                    <Award className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article Overlay Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white border border-[#E5E1DA] max-w-2xl w-full rounded-3xl overflow-hidden shadow-xl text-right"
            >
              <div className="relative h-64 bg-[#F9F8F6]">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 left-4 bg-white/80 hover:bg-red-50 text-[#1A1A1A] rounded-full p-2 border border-[#E5E1DA] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 pointer-events-none" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 right-4 text-right">
                  <span className="bg-[#D4AF37] text-white font-bold py-0.5 px-3 rounded-full text-[9px] inline-block mb-2 font-sans">منصة التعليم</span>
                  <p className="text-xs text-[#555555] font-light flex items-center gap-1.5 flex-row-reverse font-sans">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>نُشر في {selectedArticle.date}</span>
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <h3 className="text-xl md:text-2xl font-bold font-serif text-[#1A1A1A] leading-snug">{selectedArticle.title}</h3>
                <div className="text-[11px] font-semibold text-[#D4AF37] uppercase font-sans">الكاتب والمحرر العطري: {selectedArticle.author}</div>
                <div className="h-px bg-[#F0EEEA]" />
                <p className="text-[#2D2D2D] text-sm leading-relaxed whitespace-pre-line font-light py-2 font-sans">
                  {selectedArticle.content}
                </p>

                <div className="pt-4 border-t border-[#F0EEEA] flex justify-end">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="py-2.5 px-6 rounded-xl bg-[#FAF8F5] border border-[#E5E1DA] text-[#555555] text-xs font-semibold hover:text-[#1A1A1A] hover:bg-[#FDFCFB] cursor-pointer"
                  >
                    إغلاق المدونة والرجوع
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

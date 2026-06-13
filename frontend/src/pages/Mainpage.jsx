import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { 
  Store, 
  Heart, 
  Share2, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  X, 
  MessageSquare, 
  Star, 
  Check, 
  Plus, 
  ShoppingBag, 
  TrendingUp 
} from 'lucide-react'

// Beautiful high-fidelity mock data fallback if backend is empty or requires login
const MOCK_FOOD_ITEMS = [
  {
    _id: "mock-1",
    name: "Sizzling Gourmet Veg Stir Fry",
    video: "https://ik.imagekit.io/nbgi9yh0b/0f6ef6d9-1958-486f-9257-a74b8a88ab1d_7yKMuElfd",
    description: "Watch our master chefs toss fresh organic bell peppers, broccoli, and hand-cut baby corn in a sizzling wok with house-special garlic-ginger dark soy sauce. Served piping hot with toasted sesame seeds and fresh scallions.",
    likesCount: 1420,
    commentsCount: 89,
    foodpartner: {
      fullname: "Chef Kenji Lopez",
      restaurantName: "The Wok & Garden",
      address: "128 Wok Way, Chinatown, Culinary Arts District, NY 10013",
      phone: "+1 (555) 987-6543",
      email: "order@wokgarden.com",
      rating: "4.8",
      cuisine: "Asian Fusion • Stir Fry",
      hours: "11:00 AM - 10:00 PM",
      menu: [
        { name: "Signature Garlic Stir-fry Wok", price: "$14.99", desc: "Our famous vegetable stir-fry with home-made ginger garlic glaze." },
        { name: "Crispy Szechuan Spring Rolls (3pcs)", price: "$6.99", desc: "Hand-rolled crispy wrapper filled with cabbage, carrots, and sweet chili." },
        { name: "Spicy Kung Pao Noodles", price: "$15.50", desc: "Egg noodles tossed with crushed peanuts, chili peppers, and snap peas." }
      ]
    }
  },
  {
    _id: "mock-2",
    name: "Classic Italian Handmade Pasta",
    video: "https://assets.mixkit.co/videos/preview/mixkit-serving-a-plate-of-pasta-42283-large.mp4",
    description: "House-crafted fettuccine spun from semolina flour and fresh farm eggs, boiled to perfect al dente and tossed with a rich, slow-simmered marinara sauce, imported extra virgin olive oil, and freshly grated Parmigiano-Reggiano.",
    likesCount: 2350,
    commentsCount: 174,
    foodpartner: {
      fullname: "Luigi Moretti",
      restaurantName: "Trattoria Da Luigi",
      address: "452 Roma Boulevard, Little Italy, NY 10012",
      phone: "+1 (555) 123-4567",
      email: "ciao@daluigi.com",
      rating: "4.9",
      cuisine: "Classic Italian • Pasta",
      hours: "12:00 PM - 11:00 PM",
      menu: [
        { name: "Homemade Fettuccine Marinara", price: "$16.99", desc: "Fettuccine pasta in slow-cooked vine ripe tomato sauce with fresh basil." },
        { name: "Creamy Truffle Tagliatelle", price: "$22.50", desc: "Rich porcini mushrooms, truffle oil, parmesan, and heavy cream." },
        { name: "Trattoria Tiramisu", price: "$8.99", desc: "Layers of espresso soaked ladyfingers and velvety mascarpone cream." }
      ]
    }
  },
  {
    _id: "mock-3",
    name: "Masterchef's Fresh Garden Salad",
    video: "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-fresh-vegetable-salad-40544-large.mp4",
    description: "A refreshing harvest of crisp organic romaine lettuce, cherry tomatoes, sliced cucumbers, and Haas avocados, drizzled with a handcrafted lemon-herb vinaigrette. The ultimate healthy and delicious lunch option.",
    likesCount: 980,
    commentsCount: 42,
    foodpartner: {
      fullname: "Elena Rostova",
      restaurantName: "The Green Greenhouse",
      address: "88 Orchard Street, Lower East Side, NY 10002",
      phone: "+1 (555) 246-8101",
      email: "hello@greenhouse.com",
      rating: "4.7",
      cuisine: "Organic Salads • Healthy",
      hours: "09:00 AM - 08:00 PM",
      menu: [
        { name: "Greenhouse Avocado Salad", price: "$12.99", desc: "Romaine lettuce, cherry tomatoes, avocados, and lemon vinaigrette." },
        { name: "Superfood Quinoa Bowl", price: "$13.99", desc: "Quinoa, organic roasted sweet potatoes, kale, almonds, and tahini dressing." },
        { name: "Iced Ceremonial Matcha Latte", price: "$6.50", desc: "Pure stoneground matcha whisked with organic oat milk and raw agave." }
      ]
    }
  },
  {
    _id: "mock-4",
    name: "Freshly Pressed Citrus Juice",
    video: "https://assets.mixkit.co/videos/preview/mixkit-pouring-fresh-orange-juice-into-a-glass-40538-large.mp4",
    description: "Pure, sun-ripened organic Valencia oranges freshly cold-pressed to order. Naturally sweet, high in Vitamin C, and absolutely free of added sugars or preservatives. Sip the sunshine!",
    likesCount: 860,
    commentsCount: 31,
    foodpartner: {
      fullname: "Marcus Aurelius",
      restaurantName: "Nectar Juice Co.",
      address: "303 Oasis Avenue, Soho, NY 10013",
      phone: "+1 (555) 135-7924",
      email: "info@nectarjuice.com",
      rating: "4.6",
      cuisine: "Cold-Pressed Juices • Vegan",
      hours: "07:00 AM - 06:00 PM",
      menu: [
        { name: "Cold-Pressed Valencia Orange Juice", price: "$7.50", desc: "100% natural, sweet Valencia oranges freshly pressed in-house." },
        { name: "Immunity Ginger Shot (2oz)", price: "$4.50", desc: "Concentrated ginger juice, lemon, cayenne pepper, and wild honey." },
        { name: "Supergreen Detox Smoothie", price: "$9.00", desc: "Spinach, celery, green apple, banana, ginger, and coconut water." }
      ]
    }
  }
]

const Mainpage = () => {
  const [foodItems, setFoodItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStore, setSelectedStore] = useState(null)
  const [isMuted, setIsMuted] = useState(true)
  const [likes, setLikes] = useState({})
  const [addedItems, setAddedItems] = useState({})
   const [activeVideoId, setActiveVideoId] = useState("")

  const videoRefs = useRef({})
  const containerRef = useRef(null)

  // Fetch food items from backend
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/food', { withCredentials: true })
        if (res.data && res.data.food && res.data.food.length > 0) {
          // If items returned lack details, merge with mock partner structures for complete UI experience
          const enrichedFood = res.data.food.map((item, idx) => {
            const fallbackTemplate = MOCK_FOOD_ITEMS[idx % MOCK_FOOD_ITEMS.length]
            return {
              ...item,
              likesCount: item.likesCount || fallbackTemplate.likesCount,
              commentsCount: item.commentsCount || fallbackTemplate.commentsCount,
              foodpartner: item.foodpartner ? {
                ...fallbackTemplate.foodpartner,
                ...item.foodpartner,
                restaurantName: item.foodpartner.restaurantName || fallbackTemplate.foodpartner.restaurantName,
                fullname: item.foodpartner.fullname || fallbackTemplate.foodpartner.fullname,
                address: item.foodpartner.address || fallbackTemplate.foodpartner.address,
                phone: item.foodpartner.phone || fallbackTemplate.foodpartner.phone,
              } : fallbackTemplate.foodpartner
            }
          })
          setFoodItems(enrichedFood)
        } else {
          // Empty list fallback
          setFoodItems(MOCK_FOOD_ITEMS)
        }
      } catch (error) {
        console.log("Error fetching food items, using high-fidelity fallback data:", error.message)
        setFoodItems(MOCK_FOOD_ITEMS)
      } finally {
        setLoading(false)
      }
    }
    fetchFoodItems()
  }, [])

  // Setup IntersectionObserver for autoplay/pause when scrolling
  useEffect(() => {
    if (foodItems.length === 0) return

    const observerOptions = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.6 // Element is 60% visible
    }

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        const video = entry.target
        const id = video.dataset.id

        if (entry.isIntersecting) {
          setActiveVideoId(id)
          video.play().catch(err => {
            console.log("Playback interrupted or blocked by browser:", err)
          })
        } else {
          video.pause()
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions)

    // Wait slightly to ensure DOM refs are fully updated
    const timer = setTimeout(() => {
      Object.values(videoRefs.current).forEach(video => {
        if (video) observer.observe(video)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [foodItems])

  // Sync mute state across all videos
  useEffect(() => {
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.muted = isMuted
      }
    })
  }, [isMuted])

  const toggleMute = (e) => {
    e.stopPropagation()
    setIsMuted(!isMuted)
  }

  const handleLike = (id, e) => {
    e.stopPropagation()
    setLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleAddMenuItem = (menuName, e) => {
    e.stopPropagation()
    setAddedItems(prev => ({
      ...prev,
      [menuName]: true
    }))
    // Reset added status after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => ({
        ...prev,
        [menuName]: false
      }))
    }, 2000)
  }

  const shareVideo = (item, e) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: item.description,
        url: window.location.href
      }).catch(err => console.log(err))
    } else {
      // Fallback: Copy link
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-zinc-400 font-medium tracking-wide">Curating your gourmet feed...</p>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative select-none">
      {/* Snapping Video Feed Container */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-none"
      >
        {foodItems.map((item) => {
          const isLiked = likes[item._id]
          const partner = item.foodpartner || {}

          return (
            <div 
              key={item._id}
              className="h-full w-full snap-start snap-always relative flex items-center justify-center bg-zinc-950 overflow-hidden"
              onClick={(e) => {
                // Clicking anywhere on the video toggles pause/play
                const video = videoRefs.current[item._id]
                if (video) {
                  if (video.paused) {
                    video.play()
                  } else {
                    video.pause()
                  }
                }
              }}
            >
              {/* HTML5 Video Element */}
              <video
                ref={el => videoRefs.current[item._id] = el}
                data-id={item._id}
                src={item.video}
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                className="w-full h-full object-contain pointer-events-none"
              />

              {/* Glassmorphic TOP Header Overlay - Contains Description and Visit Store */}
              <div 
                className="absolute top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-20 pointer-events-auto"
                onClick={(e) => e.stopPropagation()} // Prevent video click toggle
              >
                <div className="backdrop-blur-xl bg-black/40 border border-white/10 p-4 rounded-2xl shadow-2xl transition-all duration-300 hover:bg-black/50">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-lg text-white">
                        <Store size={18} />
                      </div>
                      <div>
                        <h2 className="font-bold text-white tracking-wide text-sm sm:text-base">
                          {partner.restaurantName || "Gourmet Partner"}
                        </h2>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="flex items-center text-[10px] text-amber-400 font-semibold">
                            <Star size={10} className="fill-amber-400 mr-0.5" />
                            {partner.rating || "4.8"}
                          </span>
                          <span className="text-[10px] text-zinc-400">•</span>
                          <span className="text-[10px] text-zinc-300 font-medium">
                            {partner.cuisine || "Specialty Menu"}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Verified/Trending Tag */}
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                      <TrendingUp size={10} />
                      Partner
                    </span>
                  </div>

                  {/* Description: truncated to strictly 2 lines */}
                  <p className="text-xs sm:text-sm text-zinc-200 mt-3 line-clamp-2 leading-relaxed overflow-hidden text-ellipsis">
                    {item.description || "Indulge in our exquisite and carefully prepared dish, prepared fresh by culinary experts just for you."}
                  </p>

                  {/* Visit Store Button */}
                  <button
                    onClick={() => setSelectedStore(item)}
                    className="w-full mt-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all duration-200 cursor-pointer border-none"
                  >
                    <Store size={16} />
                    Visit Store
                  </button>
                </div>
              </div>

              {/* Mute Overlay Button (Bottom Left of Video) */}
              <button
                onClick={toggleMute}
                className="absolute bottom-6 left-6 z-20 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 active:scale-95 transition-all duration-200 cursor-pointer pointer-events-auto"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              {/* TikTok-Style Right Action Controls */}
              <div 
                className="absolute right-6 bottom-16 z-20 flex flex-col items-center gap-5 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Heart Button */}
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={(e) => handleLike(item._id, e)}
                    className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 cursor-pointer active:scale-75 ${
                      isLiked 
                        ? 'bg-rose-500 border-rose-500 text-white animate-pulse' 
                        : 'bg-black/40 border-white/10 text-white hover:bg-black/60'
                    }`}
                  >
                    <Heart size={22} className={isLiked ? 'fill-current' : ''} />
                  </button>
                  <span className="text-xs text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {isLiked ? item.likesCount + 1 : item.likesCount}
                  </span>
                </div>

                {/* Comments Mock Button */}
                <div className="flex flex-col items-center gap-1">
                  <button className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 transition-all duration-200 cursor-pointer active:scale-90">
                    <MessageSquare size={22} />
                  </button>
                  <span className="text-xs text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {item.commentsCount}
                  </span>
                </div>

                {/* Share Button */}
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={(e) => shareVideo(item, e)}
                    className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 transition-all duration-200 cursor-pointer active:scale-90"
                  >
                    <Share2 size={22} />
                  </button>
                  <span className="text-xs text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Share
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Sheet Drawer Modal - Store Details */}
      <div 
        className={`fixed inset-x-0 bottom-0 z-50 rounded-t-3xl backdrop-blur-2xl bg-zinc-950/95 border-t border-white/10 shadow-2xl flex flex-col transition-all duration-500 ease-out max-h-[82vh] ${
          selectedStore ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Drag / Close Handle */}
        <div className="relative w-full py-4 flex items-center justify-center border-b border-white/5">
          <div className="w-12 h-1 bg-zinc-700 rounded-full cursor-pointer hover:bg-zinc-600 transition-colors"></div>
          <button
            onClick={() => setSelectedStore(null)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-full transition-all duration-200 cursor-pointer"
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>

        {selectedStore && (
          <div className="overflow-y-auto p-5 sm:p-6 space-y-6 scrollbar-none">
            {/* Header section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-wider">
                <Store size={14} />
                <span>Verified Culinary Partner</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                {selectedStore.foodpartner?.restaurantName || "Gourmet Partner"}
              </h3>
              <p className="text-sm text-zinc-400 flex items-center gap-1.5">
                Managed by <span className="text-zinc-200 font-semibold">{selectedStore.foodpartner?.fullname}</span>
              </p>
            </div>

            {/* Quick Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Location Card */}
              <div className="flex gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-all duration-200">
                <div className="p-2.5 bg-orange-500/10 text-orange-400 rounded-lg h-fit">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Address</h4>
                  <p className="text-sm text-zinc-200 mt-1 leading-relaxed">
                    {selectedStore.foodpartner?.address}
                  </p>
                </div>
              </div>

              {/* Quick Info Contact Card */}
              <div className="flex gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-all duration-200">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg h-fit">
                  <Clock size={18} />
                </div>
                <div className="w-full">
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Operating Hours & Contact</h4>
                  <p className="text-sm text-zinc-200 mt-1">
                    {selectedStore.foodpartner?.hours || "11:00 AM - 10:00 PM"}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 mt-2 pt-2 border-t border-white/5 text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Phone size={12} className="text-zinc-500" /> {selectedStore.foodpartner?.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail size={12} className="text-zinc-500" /> {selectedStore.foodpartner?.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Highlights List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <ShoppingBag size={18} className="text-orange-500" />
                  Popular Menu Highlights
                </h4>
                <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded font-semibold">
                  Order Now
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(selectedStore.foodpartner?.menu || []).map((dish, idx) => {
                  const isAdded = addedItems[dish.name]

                  return (
                    <div 
                      key={idx}
                      className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col justify-between gap-3 hover:border-white/15 transition-all duration-200"
                    >
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h5 className="font-bold text-zinc-100 text-sm sm:text-base leading-snug">
                            {dish.name}
                          </h5>
                          <span className="text-orange-400 font-extrabold text-sm sm:text-base tracking-tight shrink-0">
                            {dish.price}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {dish.desc}
                        </p>
                      </div>

                      <button
                        onClick={(e) => handleAddMenuItem(dish.name, e)}
                        className={`w-full py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer border-none ${
                          isAdded 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={14} /> Added to Cart
                          </>
                        ) : (
                          <>
                            <Plus size={14} /> Add item
                          </>
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
              <a 
                href={`tel:${selectedStore.foodpartner?.phone}`}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] text-sm text-center decoration-none"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone size={16} />
                Call Restaurant
              </a>
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(selectedStore.foodpartner?.address || "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10 transition-all active:scale-[0.98] text-sm text-center decoration-none"
                onClick={(e) => e.stopPropagation()}
              >
                <MapPin size={16} />
                Get Directions
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Mainpage

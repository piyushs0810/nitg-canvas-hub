import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, ExternalLink, Filter } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Academic", "Hostel", "Clubs", "Placement", "General"];

const notices = [
  {
    id: 1,
    title: "Mid-Semester Examination Schedule for Even Semester 2024",
    content: "The mid-semester examinations for the even semester 2024 will commence from February 15, 2024. Students are requested to check their respective timetables on the academic portal.",
    category: "Academic",
    author: "Academic Section",
    date: "2024-01-12",
    isNew: true,
    isPinned: true,
  },
  {
    id: 2,
    title: "Hostel Maintenance Work Notice",
    content: "Maintenance work will be carried out in Hostel Block A and B on Sunday, January 14th. Water supply will be affected from 10 AM to 2 PM.",
    category: "Hostel",
    author: "Hostel Warden",
    date: "2024-01-11",
    isNew: true,
    isPinned: false,
  },
  {
    id: 3,
    title: "Aavishkar 2024 - Technical Fest Registrations Open",
    content: "Registrations for Aavishkar 2024, the annual technical fest of NIT Goa, are now open. Register before January 20th to avail early bird discounts.",
    category: "Clubs",
    author: "Technical Club",
    date: "2024-01-10",
    isNew: true,
    isPinned: true,
  },
  {
    id: 4,
    title: "Campus Placement Drive - TCS",
    content: "TCS will be conducting campus placement drive on January 25th, 2024. Eligible students are requested to register on the placement portal by January 18th.",
    category: "Placement",
    author: "Training & Placement Cell",
    date: "2024-01-09",
    isNew: false,
    isPinned: false,
  },
  {
    id: 5,
    title: "Library Timings Extended for Exam Period",
    content: "The central library will remain open from 8 AM to 12 AM (midnight) during the examination period starting from February 10th.",
    category: "General",
    author: "Library Admin",
    date: "2024-01-08",
    isNew: false,
    isPinned: false,
  },
  {
    id: 6,
    title: "Workshop on Machine Learning - Registration",
    content: "A two-day workshop on Machine Learning and AI will be conducted on January 20-21. Register through the events portal.",
    category: "Academic",
    author: "CSE Department",
    date: "2024-01-07",
    isNew: false,
    isPinned: false,
  },
  {
    id: 7,
    title: "Sports Meet 2024 Schedule Released",
    content: "The annual sports meet will be held from February 1-3, 2024. Team registrations are open till January 25th.",
    category: "Clubs",
    author: "Sports Council",
    date: "2024-01-05",
    isNew: false,
    isPinned: false,
  },
];

const categoryColors: Record<string, string> = {
  Academic: "badge-primary",
  Hostel: "bg-orange-100 text-orange-800",
  Clubs: "bg-purple-100 text-purple-800",
  Placement: "bg-green-100 text-green-800",
  General: "bg-gray-100 text-gray-800",
};

export default function Notices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort: pinned first, then by date
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <Layout>
      <div className="py-8">
        <div className="container-custom">
          {/* Header */}
          <div className="page-header">
            <h1 className="page-title">Campus Notices</h1>
            <p className="page-subtitle">Stay updated with the latest announcements</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search notices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Notices List */}
          <div className="space-y-4">
            {sortedNotices.map((notice) => (
              <div
                key={notice.id}
                className={`card-base p-6 ${notice.isPinned ? "border-primary/30 bg-primary/5" : ""}`}
              >
                <div className="flex flex-col gap-3">
                  {/* Header */}
                  <div className="flex flex-wrap items-start gap-2">
                    {notice.isPinned && (
                      <span className="badge-base bg-primary text-primary-foreground">
                        📌 Pinned
                      </span>
                    )}
                    {notice.isNew && (
                      <span className="badge-base bg-green-500 text-white">
                        New
                      </span>
                    )}
                    <span className={`badge-base ${categoryColors[notice.category]}`}>
                      {notice.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground">{notice.title}</h3>

                  {/* Content */}
                  <p className="text-muted-foreground">{notice.content}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2 border-t border-border">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {notice.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(notice.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <button className="flex items-center gap-1 text-primary hover:underline ml-auto">
                      Read more
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedNotices.length === 0 && (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No notices found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

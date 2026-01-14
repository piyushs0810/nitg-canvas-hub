import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, MapPin, Clock, Filter, ImagePlus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const lostFoundItems = [
  {
    id: 1,
    title: "Blue Umbrella",
    description: "Found near the main library entrance. Has a wooden handle.",
    location: "Library",
    type: "found",
    date: "2024-01-10",
    image: "https://images.unsplash.com/photo-1534309466160-70b22cc6252c?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Scientific Calculator",
    description: "Casio fx-991ES lost during the physics exam in LH-3.",
    location: "Lecture Hall 3",
    type: "lost",
    date: "2024-01-09",
    image: "https://images.unsplash.com/photo-1564473185935-5da3e0754c9f?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Black Backpack",
    description: "Found in the canteen. Contains some notebooks.",
    location: "Canteen",
    type: "found",
    date: "2024-01-08",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    title: "Wireless Earbuds",
    description: "Lost my white wireless earbuds somewhere near the sports complex.",
    location: "Sports Complex",
    type: "lost",
    date: "2024-01-07",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=200&fit=crop",
  },
  {
    id: 5,
    title: "Student ID Card",
    description: "Found a student ID card belonging to CSE department.",
    location: "Admin Block",
    type: "found",
    date: "2024-01-06",
    image: null,
  },
  {
    id: 6,
    title: "Water Bottle",
    description: "Lost my blue steel water bottle with NIT Goa sticker.",
    location: "Hostel Block A",
    type: "lost",
    date: "2024-01-05",
    image: null,
  },
];

export default function LostFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredItems = lostFoundItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || item.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      <div className="py-8">
        <div className="container-custom">
          {/* Header */}
          <div className="page-header">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="page-title">Lost & Found</h1>
                <p className="page-subtitle">Report or search for lost items on campus</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Report Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Report an Item</DialogTitle>
                    <DialogDescription>
                      Fill in the details to report a lost or found item.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="itemType">Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lost">I lost something</SelectItem>
                          <SelectItem value="found">I found something</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Item Name</Label>
                      <Input id="title" placeholder="e.g., Blue Umbrella" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Describe the item..." rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Where was it lost/found?" />
                    </div>
                    <div className="space-y-2">
                      <Label>Image (Optional)</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                        <ImagePlus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload image</p>
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Submit Report
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
                <SelectItem value="found">Found</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="card-interactive overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-muted flex items-center justify-center">
                    <Search className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <span className={item.type === "found" ? "badge-success" : "badge-danger"}>
                      {item.type === "found" ? "Found" : "Lost"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No items found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

import { Paperclip, UploadCloud, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function MediaAssetsSection() {
  return (
    <Card className="border-gray-100 shadow-sm mt-6">
      <CardHeader className="flex flex-row items-center gap-2 border-b border-gray-50 pb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <Paperclip className="w-4 h-4 text-primary" />
        </div>
        <CardTitle className="text-lg font-bold">Media Assets</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="border-2 border-dashed border-gray-100 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50/30 hover:bg-gray-50 hover:border-primary/20 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-primary" />
          </div>
          <p className="text-sm font-bold text-gray-900">Drag and drop images or videos</p>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-1">PNG, JPG, MP4 up to 50MB</p>
          <Button variant="outline" size="sm" className="mt-6 rounded-lg font-bold px-6">Browse Files</Button>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm relative group">
            <img src="https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=200&auto=format&fit=crop" alt="Thumbnail" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <button className="aspect-square rounded-xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-1 hover:bg-gray-50 hover:border-gray-200 transition-all">
            <Plus className="w-5 h-5 text-gray-300" />
            <span className="text-[9px] font-extrabold uppercase text-gray-400 tracking-tighter">Add More</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

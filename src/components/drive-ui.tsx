"use client"

import { useState } from "react"
import { File, Folder, Grid, List, Search, Settings, Upload } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"

// Mock data structure
interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  size?: string
  modified: string
  path: string
  extension?: string
}

const mockData: Record<string, FileItem[]> = {
  root: [
    { id: "1", name: "Documents", type: "folder", modified: "Mar 8, 2025", path: "/documents" },
    { id: "2", name: "Images", type: "folder", modified: "Mar 7, 2025", path: "/images" },
    { id: "3", name: "Videos", type: "folder", modified: "Mar 6, 2025", path: "/videos" },
    {
      id: "4",
      name: "Project Proposal.docx",
      type: "file",
      size: "245 KB",
      modified: "Mar 5, 2025",
      path: "/project-proposal.docx",
      extension: "docx",
    },
    {
      id: "5",
      name: "Budget 2025.xlsx",
      type: "file",
      size: "1.2 MB",
      modified: "Mar 4, 2025",
      path: "/budget-2025.xlsx",
      extension: "xlsx",
    },
    {
      id: "6",
      name: "Presentation.pptx",
      type: "file",
      size: "3.5 MB",
      modified: "Mar 3, 2025",
      path: "/presentation.pptx",
      extension: "pptx",
    },
  ],
  documents: [
    { id: "7", name: "Work", type: "folder", modified: "Mar 2, 2025", path: "/documents/work" },
    { id: "8", name: "Personal", type: "folder", modified: "Mar 1, 2025", path: "/documents/personal" },
    {
      id: "9",
      name: "Resume.pdf",
      type: "file",
      size: "420 KB",
      modified: "Feb 28, 2025",
      path: "/documents/resume.pdf",
      extension: "pdf",
    },
    {
      id: "10",
      name: "Notes.txt",
      type: "file",
      size: "12 KB",
      modified: "Feb 27, 2025",
      path: "/documents/notes.txt",
      extension: "txt",
    },
  ],
  images: [
    { id: "11", name: "Vacation", type: "folder", modified: "Feb 26, 2025", path: "/images/vacation" },
    {
      id: "12",
      name: "Profile.jpg",
      type: "file",
      size: "1.8 MB",
      modified: "Feb 25, 2025",
      path: "/images/profile.jpg",
      extension: "jpg",
    },
    {
      id: "13",
      name: "Banner.png",
      type: "file",
      size: "2.4 MB",
      modified: "Feb 24, 2025",
      path: "/images/banner.png",
      extension: "png",
    },
  ],
  videos: [
    {
      id: "14",
      name: "Tutorial.mp4",
      type: "file",
      size: "45.2 MB",
      modified: "Feb 23, 2025",
      path: "/videos/tutorial.mp4",
      extension: "mp4",
    },
    {
      id: "15",
      name: "Meeting Recording.mp4",
      type: "file",
      size: "78.5 MB",
      modified: "Feb 22, 2025",
      path: "/videos/meeting-recording.mp4",
      extension: "mp4",
    },
  ],
  "documents/work": [
    { id: "16", name: "Project A", type: "folder", modified: "Feb 21, 2025", path: "/documents/work/project-a" },
    { id: "17", name: "Project B", type: "folder", modified: "Feb 20, 2025", path: "/documents/work/project-b" },
    {
      id: "18",
      name: "Meeting Notes.docx",
      type: "file",
      size: "134 KB",
      modified: "Feb 19, 2025",
      path: "/documents/work/meeting-notes.docx",
      extension: "docx",
    },
  ],
  "documents/personal": [
    {
      id: "19",
      name: "Tax Documents.pdf",
      type: "file",
      size: "1.7 MB",
      modified: "Feb 18, 2025",
      path: "/documents/personal/tax-documents.pdf",
      extension: "pdf",
    },
    {
      id: "20",
      name: "Recipes.docx",
      type: "file",
      size: "567 KB",
      modified: "Feb 17, 2025",
      path: "/documents/personal/recipes.docx",
      extension: "docx",
    },
  ],
  "images/vacation": [
    {
      id: "21",
      name: "Beach.jpg",
      type: "file",
      size: "3.2 MB",
      modified: "Feb 16, 2025",
      path: "/images/vacation/beach.jpg",
      extension: "jpg",
    },
    {
      id: "22",
      name: "Mountains.jpg",
      type: "file",
      size: "2.8 MB",
      modified: "Feb 15, 2025",
      path: "/images/vacation/mountains.jpg",
      extension: "jpg",
    },
    {
      id: "23",
      name: "City.jpg",
      type: "file",
      size: "2.5 MB",
      modified: "Feb 14, 2025",
      path: "/images/vacation/city.jpg",
      extension: "jpg",
    },
  ],
  "documents/work/project-a": [
    {
      id: "24",
      name: "Specifications.docx",
      type: "file",
      size: "320 KB",
      modified: "Feb 13, 2025",
      path: "/documents/work/project-a/specifications.docx",
      extension: "docx",
    },
    {
      id: "25",
      name: "Timeline.xlsx",
      type: "file",
      size: "450 KB",
      modified: "Feb 12, 2025",
      path: "/documents/work/project-a/timeline.xlsx",
      extension: "xlsx",
    },
  ],
  "documents/work/project-b": [
    {
      id: "26",
      name: "Proposal.pdf",
      type: "file",
      size: "1.1 MB",
      modified: "Feb 11, 2025",
      path: "/documents/work/project-b/proposal.pdf",
      extension: "pdf",
    },
    {
      id: "27",
      name: "Budget.xlsx",
      type: "file",
      size: "890 KB",
      modified: "Feb 10, 2025",
      path: "/documents/work/project-b/budget.xlsx",
      extension: "xlsx",
    },
  ],
}

export function DriveUI() {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  // Get current folder's content based on path
  const getCurrentFolderKey = (): string => {
    if (currentPath.length === 0) return "root"
    return currentPath.join("/")
  }

  const currentFolderContents = mockData[getCurrentFolderKey()] ?? []

  // Navigate to a folder
  const navigateToFolder = (folderPath: string) => {
    // Remove leading slash if present
    const cleanPath = folderPath.startsWith("/") ? folderPath.substring(1) : folderPath
    setCurrentPath(cleanPath.split("/").filter(Boolean))
  }

  // Navigate up one level
  const navigateUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1))
    }
  }

  // Get file icon based on extension
  const getFileIcon = (extension?: string) => {
    switch (extension) {
      case "pdf":
        return <File className="text-red-500" />
      case "docx":
        return <File className="text-blue-500" />
      case "xlsx":
        return <File className="text-green-500" />
      case "pptx":
        return <File className="text-orange-500" />
      case "jpg":
      case "png":
        return <File className="text-purple-500" />
      case "mp4":
        return <File className="text-pink-500" />
      default:
        return <File />
    }
  }

  // Generate breadcrumbs
  const breadcrumbs = [
    { name: "My Drive", path: [] },
    ...currentPath.map((segment, index) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: currentPath.slice(0, index + 1),
    })),
  ]

  return (
    <div className="flex flex-col h-screen dark bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 87 87" className="w-10 h-10">
            <path d="M49.5,21.9l-18,31.2L21,39.8L0,74.5h87L49.5,21.9z" fill="#4285F4" />
            <path d="M73.7,31.9L59.8,12.5L45.9,31.9L59.8,51.3L73.7,31.9z" fill="#FBBC05" />
            <path d="M45.9,31.9L32,12.5L18.1,31.9L32,51.3L45.9,31.9z" fill="#EA4335" />
            <path d="M18.1,31.9L4.2,12.5L-9.7,31.9L4.2,51.3L18.1,31.9z" fill="#34A853" />
          </svg>
          <h1 className="text-xl font-semibold">Drive</h1>
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search in Drive" className="pl-8 w-full bg-background" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4">
        {/* Breadcrumbs and Toolbar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <Breadcrumb className="bg-muted/20 p-2 rounded-md">
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem key={index}>
                  {index < breadcrumbs.length - 1 ? (
                    <BreadcrumbLink
                      onClick={() => setCurrentPath(crumb.path)}
                      className="cursor-pointer hover:text-primary"
                    >
                      {crumb.name}
                    </BreadcrumbLink>
                  ) : (
                    <span>{crumb.name}</span>
                  )}
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Upload files</DropdownMenuItem>
                <DropdownMenuItem>Upload folder</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex border rounded-md border-border">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-r-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-l-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Files and folders */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentFolderContents.map((item) => (
              <div
                key={item.id}
                className="border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => item.type === "folder" && navigateToFolder(item.path)}
              >
                <div className="flex justify-center mb-2">
                  {item.type === "folder" ? (
                    <Folder className="h-12 w-12 text-blue-400" />
                  ) : (
                    <div className="h-12 w-12 flex items-center justify-center">{getFileIcon(item.extension)}</div>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium truncate" title={item.name}>
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.type === "file" ? item.size : ""}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-border rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/20">
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Modified</th>
                  <th className="text-left p-3 font-medium">Size</th>
                </tr>
              </thead>
              <tbody>
                {currentPath.length > 0 && (
                  <tr className="border-t border-border hover:bg-muted/20 cursor-pointer" onClick={navigateUp}>
                    <td className="p-3 flex items-center gap-2">
                      <Folder className="h-5 w-5 text-blue-400" />
                      ..
                    </td>
                    <td className="p-3"></td>
                    <td className="p-3"></td>
                  </tr>
                )}
                {currentFolderContents.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-border hover:bg-muted/20 cursor-pointer"
                    onClick={() => item.type === "folder" && navigateToFolder(item.path)}
                  >
                    <td className="p-3 flex items-center gap-2">
                      {item.type === "folder" ? (
                        <Folder className="h-5 w-5 text-blue-400" />
                      ) : (
                        getFileIcon(item.extension)
                      )}
                      {item.name}
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">{item.modified}</td>
                    <td className="p-3 text-sm text-muted-foreground">{item.size ?? "--"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}


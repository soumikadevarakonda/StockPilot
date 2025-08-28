
"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { marketNews } from "@/lib/mock-data"

export default function MarketNewsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Market News</CardTitle>
          <CardDescription>
            Stay up-to-date with the latest news affecting the stock market.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {marketNews.map((news, index) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="flex h-full flex-col">
              <CardHeader>
                 <div className="relative h-40 w-full">
                    <Image
                      src={news.image}
                      alt={news.headline}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                      data-ai-hint="market news"
                    />
                 </div>
                <CardTitle className="mt-4">{news.headline}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{news.source}</span>
                  <span>&bull;</span>
                  <span>{new Date(news.date).toLocaleDateString()}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground">{news.summary}</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href={news.url} target="_blank">
                    Read Full Article <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

import { Media } from "@/payload-types";

export function MeiliImage(image: Media) {
  if (!image) {
    return null
  }

  if (!image.sizes) {
    return null
  }

  return {
    ...(image.sizes?.large && { large: image.sizes.large.url }),
    ...(image.sizes?.medium && { medium: image.sizes.medium.url }),
    ...(image.sizes?.small && { medium: image.sizes.small.url }),
    ...(image.sizes?.og && { medium: image.sizes.og.url }),
    ...(image.sizes?.square && { medium: image.sizes.square.url })
  }
}

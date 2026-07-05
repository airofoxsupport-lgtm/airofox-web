// Mapping of pricing variants to their respective image assets downloaded from Google Drive.
// Since these images are located in public/pricing/services-photos/, they are served at /pricing/services-photos/...

const imageMap: Record<string, string> = {
  // --- AC Services ---
  "ac::ac installation::ac installation::split ac installation": "/pricing/services-photos/87c28153-47f6-490d-979a-d478ec3bec58.jpg",
  "ac::ac installation::ac installation::window ac installation": "/pricing/services-photos/87c28153-47f6-490d-979a-d478ec3bec58.jpg",
  "ac::ac gas refill::ac gas refill::ac gas refill": "/pricing/services-photos/d395fc4a-e251-452c-bcac-1f749eb97251.jpg",
  "ac::ac servicing::foam jet service::1 ac": "/pricing/services-photos/83f44a62-55da-44a7-b14e-ad5425df5fa7.jpg",
  "ac::ac servicing::foam jet service::2 acs": "/pricing/services-photos/83f44a62-55da-44a7-b14e-ad5425df5fa7.jpg",
  "ac::ac repairs::ac repairs::water leakage fix": "/pricing/services-photos/afa3f32d-11ed-4d6c-9cce-d61f85218ab0.jpg",
  "ac::ac repairs::ac repairs::cooling issue": "/pricing/services-photos/930bccf8-fda1-42e0-ad1a-96b2c2b82fb4.jpg",
  "ac::ac repairs::ac repairs::power issue": "/pricing/services-photos/930bccf8-fda1-42e0-ad1a-96b2c2b82fb4.jpg",
  "ac::ac repairs::ac repairs::unwanted noise / smell": "/pricing/services-photos/930bccf8-fda1-42e0-ad1a-96b2c2b82fb4.jpg",

  // --- Plumbing ---
  // Tap subcategory
  "plumbing::tap::tap repair::regular tap": "/pricing/services-photos/Tap.jpg",
  "plumbing::tap::tap repair::swan tap": "/pricing/services-photos/Swan tap.jpg",
  "plumbing::tap::tap repair::hot & cold mixer": "/pricing/services-photos/Hot and cold mixer.jpg",
  "plumbing::tap::tap repair::shower mixer": "/pricing/services-photos/Shower mixer tap.jpg",
  "plumbing::tap::tap accessories::filter installation": "/pricing/services-photos/Tap filter.jpg",
  "plumbing::tap::tap accessories::extender installation": "/pricing/services-photos/Tap extender_.jpg",
  "plumbing::tap::tap accessories::water saving nozzle": "/pricing/services-photos/Water saving nozzle.jpg",
  "plumbing::tap::tap accessories::double connection": "/pricing/services-photos/Tap double connection.jpg",
  "plumbing::tap::tap installation / replacement::regular tap": "/pricing/services-photos/Tap.jpg",
  "plumbing::tap::tap installation / replacement::hot & cold mixer": "/pricing/services-photos/Hot and cold mixer.jpg",
  "plumbing::tap::tap installation / replacement::shower mixer": "/pricing/services-photos/Shower mixer.jpg",
  "plumbing::tap::tap installation / replacement::swan tap": "/pricing/services-photos/Swan tap.jpg",

  // Toilet subcategory
  "plumbing::toilet::jet spray::jet spray repair / replacement": "/pricing/services-photos/Jet spray.jpg",
  "plumbing::toilet::jet spray::bidet repair / replacement": "/pricing/services-photos/Bidet.jpg",
  "plumbing::toilet::toilet seat::toilet seat cover installation": "/pricing/services-photos/Toilet seat cover.jpg",
  "plumbing::toilet::flush tank repair::external pvc": "/pricing/services-photos/External PVC flush tank.jpg",
  "plumbing::toilet::flush tank repair::external ceramic": "/pricing/services-photos/External ceramic flush tank.jpg",
  "plumbing::toilet::flush tank repair::concealed flush tank": "/pricing/services-photos/Concealed flush.jpg",
  "plumbing::toilet::flush tank replacement::external flush tank": "/pricing/services-photos/External flush tank.jpg",
  "plumbing::toilet::indian toilet::installation / replacement": "/pricing/services-photos/Indian toilet.jpg",
  "plumbing::toilet::indian toilet::repair": "/pricing/services-photos/Indian toilet.jpg",
  "plumbing::toilet::indian toilet::pot blockage removal": "/pricing/services-photos/Toilet pot.jpg",
  "plumbing::toilet::western toilet (wall mounted)::installation / replacement": "/pricing/services-photos/Western toilet (wall mounted).jpg",
  "plumbing::toilet::western toilet (wall mounted)::repair": "/pricing/services-photos/Western toilet (wall mounted).jpg",
  "plumbing::toilet::western toilet (wall mounted)::pot blockage removal": "/pricing/services-photos/Toilet pot.jpg",
  "plumbing::toilet::western toilet (floor mounted)::installation / replacement": "/pricing/services-photos/Western toilet (floor mounted).jpg",
  "plumbing::toilet::western toilet (floor mounted)::repair": "/pricing/services-photos/Western toilet (floor mounted).jpg",
  "plumbing::toilet::western toilet (floor mounted)::pot blockage removal": "/pricing/services-photos/Toilet pot.jpg",

  // Bath & Shower subcategory
  "plumbing::bath & shower::shower mixer::shower mixer installation": "/pricing/services-photos/Shower mixer.jpg",
  "plumbing::bath & shower::shower installation::ceiling mounted": "/pricing/services-photos/Ceiling mounted shower.jpg",
  "plumbing::bath & shower::shower installation::wall mounted": "/pricing/services-photos/Wall mounted shower.jpg",
  "plumbing::bath & shower::shower installation::handheld shower": "/pricing/services-photos/Shower handheld_.jpg",
  "plumbing::bath & shower::other services::shower filter installation": "/pricing/services-photos/Shower filter.jpg",
  "plumbing::bath & shower::other services::shower repair": "/pricing/services-photos/Shower.jpg",

  // Bath Accessories subcategory
  "plumbing::bath accessories::soap holder::installation": "/pricing/services-photos/Soap holder.jpg",
  "plumbing::bath accessories::towel holder::towel rack": "/pricing/services-photos/Towel rack.jpg",
  "plumbing::bath accessories::towel holder::holding rod": "/pricing/services-photos/Towel rod.jpg",
  "plumbing::bath accessories::towel holder::small holder": "/pricing/services-photos/Small holder.jpg",
  "plumbing::bath accessories::shelf installation::floating glass shelf": "/pricing/services-photos/Floating glass shelf.jpg",
  "plumbing::bath accessories::shelf installation::corner shelf": "/pricing/services-photos/Corner shelf.jpg",

  // Basin & Sink subcategory
  "plumbing::basin & sink::leakage repair::waste pipe": "/pricing/services-photos/Waste pipe basin.jpg",
  "plumbing::basin & sink::leakage repair::bottle trap": "/pricing/services-photos/Bottle trap basin.jpg",
  "plumbing::basin & sink::other services::blockage removal": "/pricing/services-photos/Wash basin blockage removal.jpg",
  "plumbing::basin & sink::other services::wash basin installation": "/pricing/services-photos/Wash basin installation.jpg",
  "plumbing::basin & sink::other services::bottle trap waste coupling": "/pricing/services-photos/Wash basin (bottle trap).jpg",
  "plumbing::basin & sink::other services::waste pipe coupling": "/pricing/services-photos/wash basin (waste pipe).jpg",

  // Drainage & Blockage subcategory
  "plumbing::drainage & blockage::drain cover::installation": "/pricing/services-photos/drain cover installation.jpg",
  "plumbing::drainage & blockage::blockage removal::bathroom / balcony": "/pricing/services-photos/Bathroom_balcony_.jpg",
  "plumbing::drainage & blockage::blockage removal::kitchen sink": "/pricing/services-photos/Kitchen sink.jpg",
  "plumbing::drainage & blockage::blockage removal::wash basin": "/pricing/services-photos/Wash basin.jpg",
  "plumbing::drainage & blockage::blockage removal::toilet pot": "/pricing/services-photos/Toilet pot.jpg",

  // Leakage & Connections subcategory
  "plumbing::leakage & connections::leakage & connections::connection hose installation": "/pricing/services-photos/Connection hose installation.jpg",
  "plumbing::leakage & connections::leakage & connections::ro water connection": "/pricing/services-photos/RO water connection installation.jpg",
  "plumbing::leakage & connections::leakage & connections::geyser connection leakage repair": "/pricing/services-photos/Geyser connection leakage repair.jpg",
  "plumbing::leakage & connections::leakage & connections::shut-off valve leakage repair": "/pricing/services-photos/Shut-off valve leakage repair.jpg",

  // Water Tank & Motor subcategory
  "plumbing::water tank & motor::water tank installation::up to 500l": "/pricing/services-photos/Overhead water tank installation.jpg",
  "plumbing::water tank & motor::water tank installation::500l–2000l": "/pricing/services-photos/Overhead water tank installation.jpg",
  "plumbing::water tank & motor::water tank repair::water overflow": "/pricing/services-photos/water overflow.jpg",
  "plumbing::water tank & motor::water tank repair::cover change": "/pricing/services-photos/cover change.jpg",
  "plumbing::water tank & motor::water tank repair::connection leakage": "/pricing/services-photos/Connection leakage.jpg",
  "plumbing::water tank & motor::motor::motor installation": "/pricing/services-photos/Motor installation.jpg",
  "plumbing::water tank & motor::motor::motor air cavity removal": "/pricing/services-photos/Motor air cavity removal.jpg",


  // --- Electrical Services ---
  // Switches & Sockets subcategory
  "electrical::switches & sockets::replacement::standard switch / socket": "/pricing/services-photos/1 switch.jpg",
  "electrical::switches & sockets::replacement::16 amp power switch": "/pricing/services-photos/1 switch.jpg",
  "electrical::switches & sockets::replacement::32 amp power switch": "/pricing/services-photos/1 switch.jpg",
  "electrical::switches & sockets::switchboard::1 switch": "/pricing/services-photos/1 switch.jpg",
  "electrical::switches & sockets::switchboard::2 switches": "/pricing/services-photos/2 switces.jpg",
  "electrical::switches & sockets::switchboard::more than 2 switches": "/pricing/services-photos/more than 2 switches.jpg",
  "electrical::switches & sockets::switchboard::ac switchboard": "/pricing/services-photos/AC Switchboard.jpg",
  "electrical::switches & sockets::plug replacement::2 pin plug": "/pricing/services-photos/2 pin plug.jpg",
  "electrical::switches & sockets::plug replacement::regular plug": "/pricing/services-photos/regular plug replacement.jpg",
  "electrical::switches & sockets::new switch box::1 switch box": "/pricing/services-photos/Plug replacement.jpg",
  "electrical::switches & sockets::new switch box::2 switch box": "/pricing/services-photos/Plug replacement.jpg",
  "electrical::switches & sockets::new switch box::more than 2 switch box": "/pricing/services-photos/Plug replacement.jpg",
  "electrical::switches & sockets::new switch box::ac switch box": "/pricing/services-photos/Plug replacement.jpg",

  // Fan Services subcategory
  "electrical::fan services::fan repair::noise repair": "/pricing/services-photos/Fan repair.jpg",
  "electrical::fan services::fan repair::slow speed repair": "/pricing/services-photos/Fan repair.jpg",
  "electrical::fan services::fan repair::blades not spinning": "/pricing/services-photos/Fan repair.jpg",
  "electrical::fan services::ceiling fan::regular ceiling fan - install": "/pricing/services-photos/Regular ceiling fan installation.jpg",
  "electrical::fan services::ceiling fan::regular ceiling fan - replace": "/pricing/services-photos/Regular ceiling fan installation.jpg",
  "electrical::fan services::ceiling fan::regular ceiling fan - uninstall": "/pricing/services-photos/Regular ceiling fan installation.jpg",
  "electrical::fan services::ceiling fan::decorative fan - install": "/pricing/services-photos/Regular ceiling fan installation.jpg",
  "electrical::fan services::ceiling fan::decorative fan - replace": "/pricing/services-photos/Regular ceiling fan installation.jpg",
  "electrical::fan services::ceiling fan::decorative fan - uninstall": "/pricing/services-photos/Regular ceiling fan installation.jpg",
  "electrical::fan services::ceiling fan::smart / bldc fan - install": "/pricing/services-photos/Smart_BLDC fan installation.jpg",
  "electrical::fan services::ceiling fan::smart / bldc fan - replace": "/pricing/services-photos/Smart_BLDC fan installation.jpg",
  "electrical::fan services::ceiling fan::smart / bldc fan - uninstall": "/pricing/services-photos/Smart_BLDC fan installation.jpg",
  "electrical::fan services::ceiling fan::exhaust / pedestal / tower fan - install": "/pricing/services-photos/Exhaust_pedestal_tower fan installation.jpg",
  "electrical::fan services::ceiling fan::exhaust / pedestal / tower fan - replace": "/pricing/services-photos/Exhaust_pedestal_tower fan installation.jpg",
  "electrical::fan services::ceiling fan::exhaust / pedestal / tower fan - uninstall": "/pricing/services-photos/Exhaust_pedestal_tower fan installation.jpg",
  "electrical::fan services::regulator::fan regulator replacement": "/pricing/services-photos/Fan regulator replacement.jpg",

  // Light Services subcategory
  "electrical::light services::fancy light::installation / replacement": "/pricing/services-photos/Fancy light installation_replacement.jpg",
  "electrical::light services::tube light::repair & installation": "/pricing/services-photos/Tubelight repair & Installation.jpg",
  "electrical::light services::bulbs::bulb only": "/pricing/services-photos/Only bulb.jpg",
  "electrical::light services::bulbs::holder only": "/pricing/services-photos/Only bulb holder.jpg",
  "electrical::light services::bulbs::bulb + holder": "/pricing/services-photos/bulb and bulb holder.jpg",
  "electrical::light services::ceiling lights::false ceiling panel": "/pricing/services-photos/panel lights (false ceiling).jpg",
  "electrical::light services::ceiling lights::surface panel": "/pricing/services-photos/panel lights (mounted to the surface).jpg",
  "electrical::light services::hanging lights::single lamp": "/pricing/services-photos/single lamp installation.jpg",
  "electrical::light services::hanging lights::cluster (2–5 lamps)": "/pricing/services-photos/cluster install (2-5 lamps).jpg",
  "electrical::light services::hanging lights::large (12+ bulbs)": "/pricing/services-photos/large (more than 12 bulbs).jpg",
  "electrical::light services::chandeliers::small": "/pricing/services-photos/Hanging light installation.jpg",
  "electrical::light services::chandeliers::single tier (up to 6 lights)": "/pricing/services-photos/Hanging light installation.jpg",
  "electrical::light services::chandeliers::medium (6+ lights)": "/pricing/services-photos/Hanging light installation.jpg",
  "electrical::light services::chandeliers::extra large (30kg+)": "/pricing/services-photos/Hanging light installation.jpg",

  // Wiring subcategory
  "electrical::wiring::internal wiring::new internal wiring (per 5m)": "/pricing/services-photos/internal wiring (per 5m).jpg",
  "electrical::wiring::external wiring::with casing (per 5m)": "/pricing/services-photos/new external wiring (per 5m).jpg",
  "electrical::wiring::external wiring::without casing (per 5m)": "/pricing/services-photos/new external wiring (per 5m).jpg",

  // Inverter subcategory
  "electrical::inverter::installation::single battery": "/pricing/services-photos/Plug replacement.jpg",
  "electrical::inverter::installation::double battery": "/pricing/services-photos/Plug replacement.jpg",
  "electrical::inverter::other services::fuse replacement": "/pricing/services-photos/Plug replacement.jpg",
  "electrical::inverter::other services::servicing": "/pricing/services-photos/Plug replacement.jpg",
  "electrical::inverter::other services::check-up": "/pricing/services-photos/Plug replacement.jpg",
  "electrical::inverter::other services::uninstallation": "/pricing/services-photos/Plug replacement.jpg",
};

/**
 * Returns the local URL path for the pricing image of a specific service variant.
 * All paths returned match the extracted files from Google Drive.
 */
export function getPricingImage(
  categoryId: string,
  subcategoryName: string,
  serviceName: string,
  variantName: string
): string | null {
  const key = `${categoryId.toLowerCase()}::${subcategoryName.toLowerCase()}::${serviceName.toLowerCase()}::${variantName.toLowerCase()}`.trim();
  return imageMap[key] || null;
}

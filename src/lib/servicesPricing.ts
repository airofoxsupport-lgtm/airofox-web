export interface ServiceVariant {
  name: string;
  price: number;
}

export interface ServiceDetail {
  name: string;
  variants: ServiceVariant[];
}

export interface ServiceSubcategory {
  name: string;
  services: ServiceDetail[];
}

export interface ServiceCategory {
  id: string;
  category: string;
  icon?: string;
  image?: any;
  subcategories: ServiceSubcategory[];
}

export const detailedServices: ServiceCategory[] = [
  {
    id: 'ac',
    category: 'AC Services',
    icon: 'Wind',
    image: require('../../public/services/ac.jpeg'),
    subcategories: [
      {
        name: 'AC Installation',
        services: [
          {
            name: 'AC Installation',
            variants: [
              { name: 'Split AC Installation', price: 1299 },
              { name: 'Window AC Installation', price: 699 },
            ],
          },
        ],
      },
      {
        name: 'AC Gas Refill',
        services: [
          {
            name: 'AC Gas Refill',
            variants: [
              { name: 'AC Gas Refill', price: 2499 },
            ],
          },
        ],
      },
      {
        name: 'AC Servicing',
        services: [
          {
            name: 'Foam Jet Service',
            variants: [
              { name: '1 AC', price: 499 },
              { name: '2 ACs', price: 989 },
            ],
          },
        ],
      },
      {
        name: 'AC Repairs',
        services: [
          {
            name: 'AC Repairs',
            variants: [
              { name: 'Water Leakage Fix', price: 499 },
              { name: 'Cooling Issue', price: 249 },
              { name: 'Power Issue', price: 249 },
              { name: 'Unwanted Noise / Smell', price: 399 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'plumbing',
    category: 'Plumbing',
    icon: 'Droplets',
    image: require('../../public/services/plumber.jpg'),
    subcategories: [
      {
        name: 'Tap',
        services: [
          {
            name: 'Tap Repair',
            variants: [
              { name: 'Regular Tap', price: 99 },
              { name: 'Swan Tap', price: 99 },
              { name: 'Hot & Cold Mixer', price: 179 },
              { name: 'Shower Mixer', price: 209 },
            ],
          },
          {
            name: 'Tap Accessories',
            variants: [
              { name: 'Filter Installation', price: 79 },
              { name: 'Extender Installation', price: 89 },
              { name: 'Water Saving Nozzle', price: 99 },
              { name: 'Double Connection', price: 99 },
            ],
          },
          {
            name: 'Tap Installation / Replacement',
            variants: [
              { name: 'Regular Tap', price: 99 },
              { name: 'Hot & Cold Mixer', price: 179 },
              { name: 'Shower Mixer', price: 209 },
              { name: 'Swan Tap', price: 229 },
            ],
          },
        ],
      },
      {
        name: 'Toilet',
        services: [
          {
            name: 'Jet Spray',
            variants: [
              { name: 'Jet Spray Repair / Replacement', price: 99 },
              { name: 'Bidet Repair / Replacement', price: 99 },
            ],
          },
          {
            name: 'Toilet Seat',
            variants: [
              { name: 'Toilet Seat Cover Installation', price: 99 },
            ],
          },
          {
            name: 'Flush Tank Repair',
            variants: [
              { name: 'External PVC', price: 139 },
              { name: 'External Ceramic', price: 179 },
              { name: 'Concealed Flush Tank', price: 199 },
            ],
          },
          {
            name: 'Flush Tank Replacement',
            variants: [
              { name: 'External Flush Tank', price: 419 },
            ],
          },
          {
            name: 'Indian Toilet',
            variants: [
              { name: 'Installation / Replacement', price: 1599 },
              { name: 'Repair', price: 649 },
              { name: 'Pot Blockage Removal', price: 1199 },
            ],
          },
          {
            name: 'Western Toilet (Wall Mounted)',
            variants: [
              { name: 'Installation / Replacement', price: 1799 },
              { name: 'Repair', price: 649 },
              { name: 'Pot Blockage Removal', price: 1199 },
            ],
          },
          {
            name: 'Western Toilet (Floor Mounted)',
            variants: [
              { name: 'Installation / Replacement', price: 1799 },
              { name: 'Repair', price: 649 },
              { name: 'Pot Blockage Removal', price: 1199 },
            ],
          },
        ],
      },
      {
        name: 'Bath & Shower',
        services: [
          {
            name: 'Shower Mixer',
            variants: [
              { name: 'Shower Mixer Installation', price: 209 },
            ],
          },
          {
            name: 'Shower Installation',
            variants: [
              { name: 'Ceiling Mounted', price: 129 },
              { name: 'Wall Mounted', price: 109 },
              { name: 'Handheld Shower', price: 99 },
            ],
          },
          {
            name: 'Other Services',
            variants: [
              { name: 'Shower Filter Installation', price: 99 },
              { name: 'Shower Repair', price: 99 },
            ],
          },
        ],
      },
      {
        name: 'Bath Accessories',
        services: [
          {
            name: 'Soap Holder',
            variants: [
              { name: 'Installation', price: 79 },
            ],
          },
          {
            name: 'Towel Holder',
            variants: [
              { name: 'Towel Rack', price: 129 },
              { name: 'Holding Rod', price: 109 },
              { name: 'Small Holder', price: 99 },
            ],
          },
          {
            name: 'Shelf Installation',
            variants: [
              { name: 'Floating Glass Shelf', price: 119 },
              { name: 'Corner Shelf', price: 99 },
            ],
          },
        ],
      },
      {
        name: 'Basin & Sink',
        services: [
          {
            name: 'Leakage Repair',
            variants: [
              { name: 'Waste Pipe', price: 99 },
              { name: 'Bottle Trap', price: 179 },
            ],
          },
          {
            name: 'Other Services',
            variants: [
              { name: 'Blockage Removal', price: 179 },
              { name: 'Wash Basin Installation', price: 439 },
              { name: 'Bottle Trap Waste Coupling', price: 209 },
              { name: 'Waste Pipe Coupling', price: 149 },
            ],
          },
        ],
      },
      {
        name: 'Drainage & Blockage',
        services: [
          {
            name: 'Drain Cover',
            variants: [
              { name: 'Installation', price: 139 },
            ],
          },
          {
            name: 'Blockage Removal',
            variants: [
              { name: 'Bathroom / Balcony', price: 179 },
              { name: 'Kitchen Sink', price: 179 },
              { name: 'Wash Basin', price: 179 },
              { name: 'Toilet Pot', price: 1199 },
            ],
          },
        ],
      },
      {
        name: 'Leakage & Connections',
        services: [
          {
            name: 'Leakage & Connections',
            variants: [
              { name: 'Connection Hose Installation', price: 79 },
              { name: 'RO Water Connection', price: 99 },
              { name: 'Geyser Connection Leakage Repair', price: 99 },
              { name: 'Shut-off Valve Leakage Repair', price: 99 },
            ],
          },
        ],
      },
      {
        name: 'Water Tank & Motor',
        services: [
          {
            name: 'Water Tank Installation',
            variants: [
              { name: 'Up to 500L', price: 599 },
              { name: '500L–2000L', price: 1099 },
            ],
          },
          {
            name: 'Water Tank Repair',
            variants: [
              { name: 'Water Overflow', price: 139 },
              { name: 'Cover Change', price: 99 },
              { name: 'Connection Leakage', price: 99 },
            ],
          },
          {
            name: 'Motor',
            variants: [
              { name: 'Motor Installation', price: 399 },
              { name: 'Motor Air Cavity Removal', price: 99 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'electrical',
    category: 'Electrical Services',
    icon: 'Zap',
    image: require('../../public/services/electrician.jpg'),
    subcategories: [
      {
        name: 'Switches & Sockets',
        services: [
          {
            name: 'Replacement',
            variants: [
              { name: 'Standard Switch / Socket', price: 69 },
              { name: '16 AMP Power Switch', price: 89 },
              { name: '32 AMP Power Switch', price: 129 },
            ],
          },
          {
            name: 'Switchboard',
            variants: [
              { name: '1 Switch', price: 99 },
              { name: '2 Switches', price: 149 },
              { name: 'More than 2 Switches', price: 179 },
              { name: 'AC Switchboard', price: 249 },
            ],
          },
          {
            name: 'Plug Replacement',
            variants: [
              { name: '2 Pin Plug', price: 69 },
              { name: 'Regular Plug', price: 89 },
            ],
          },
          {
            name: 'New Switch Box',
            variants: [
              { name: '1 Switch Box', price: 139 },
              { name: '2 Switch Box', price: 179 },
              { name: 'More than 2 Switch Box', price: 229 },
              { name: 'AC Switch Box', price: 279 },
            ],
          },
        ],
      },
      {
        name: 'Fan Services',
        services: [
          {
            name: 'Fan Repair',
            variants: [
              { name: 'Noise Repair', price: 149 },
              { name: 'Slow Speed Repair', price: 149 },
              { name: 'Blades Not Spinning', price: 149 },
            ],
          },
          {
            name: 'Ceiling Fan',
            variants: [
              { name: 'Regular Ceiling Fan - Install', price: 139 },
              { name: 'Regular Ceiling Fan - Replace', price: 209 },
              { name: 'Regular Ceiling Fan - Uninstall', price: 99 },
              { name: 'Decorative Fan - Install', price: 229 },
              { name: 'Decorative Fan - Replace', price: 279 },
              { name: 'Decorative Fan - Uninstall', price: 99 },
              { name: 'Smart / BLDC Fan - Install', price: 189 },
              { name: 'Smart / BLDC Fan - Replace', price: 259 },
              { name: 'Smart / BLDC Fan - Uninstall', price: 99 },
              { name: 'Exhaust / Pedestal / Tower Fan - Install', price: 149 },
              { name: 'Exhaust / Pedestal / Tower Fan - Replace', price: 229 },
              { name: 'Exhaust / Pedestal / Tower Fan - Uninstall', price: 99 },
            ],
          },
          {
            name: 'Regulator',
            variants: [
              { name: 'Fan Regulator Replacement', price: 79 },
            ],
          },
        ],
      },
      {
        name: 'Light Services',
        services: [
          {
            name: 'Fancy Light',
            variants: [
              { name: 'Installation / Replacement', price: 149 },
            ],
          },
          {
            name: 'Tube Light',
            variants: [
              { name: 'Repair & Installation', price: 99 },
            ],
          },
          {
            name: 'Bulbs',
            variants: [
              { name: 'Bulb Only', price: 49 },
              { name: 'Holder Only', price: 79 },
              { name: 'Bulb + Holder', price: 99 },
            ],
          },
          {
            name: 'Ceiling Lights',
            variants: [
              { name: 'False Ceiling Panel', price: 89 },
              { name: 'Surface Panel', price: 99 },
            ],
          },
          {
            name: 'Hanging Lights',
            variants: [
              { name: 'Single Lamp', price: 199 },
              { name: 'Cluster (2–5 Lamps)', price: 249 },
              { name: 'Large (12+ Bulbs)', price: 399 },
            ],
          },
          {
            name: 'Chandeliers',
            variants: [
              { name: 'Small', price: 449 },
              { name: 'Single Tier (Up to 6 Lights)', price: 699 },
              { name: 'Medium (6+ Lights)', price: 1249 },
              { name: 'Extra Large (30kg+)', price: 1899 },
            ],
          },
        ],
      },
      {
        name: 'Wiring',
        services: [
          {
            name: 'Internal Wiring',
            variants: [
              { name: 'New Internal Wiring (Per 5m)', price: 179 },
            ],
          },
          {
            name: 'External Wiring',
            variants: [
              { name: 'With Casing (Per 5m)', price: 209 },
              { name: 'Without Casing (Per 5m)', price: 109 },
            ],
          },
        ],
      },
      {
        name: 'Inverter',
        services: [
          {
            name: 'Installation',
            variants: [
              { name: 'Single Battery', price: 449 },
              { name: 'Double Battery', price: 539 },
            ],
          },
          {
            name: 'Other Services',
            variants: [
              { name: 'Fuse Replacement', price: 99 },
              { name: 'Servicing', price: 209 },
              { name: 'Check-up', price: 129 },
              { name: 'Uninstallation', price: 449 },
            ],
          },
        ],
      },
    ],
  },
];

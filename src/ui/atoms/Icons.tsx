import { twMerge } from 'tailwind-merge'

interface IconProps {
  onClick?: () => void
  className?: string
}

export const Cogwheel: React.FC<IconProps> = (props) =>
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path fillRule="evenodd" clip-rule="evenodd" d="M16.8401 4.34756L18.3154 6.90244C18.4599 7.15277 18.5131 7.44539 18.4661 7.73053C18.4191 8.01568 18.2748 8.27574 18.0577 8.4665L16.3077 10L15.4836 9.06006L17.2323 7.52744L15.7573 4.97256L13.603 5.70131C13.1023 5.27943 12.5325 4.9472 11.9188 4.71925L11.475 2.5H8.52501L8.08089 4.71925C7.4628 4.94385 6.88873 5.27475 6.38457 5.697L4.24289 4.97256L2.7672 7.52744L4.46614 9.02069C4.35252 9.66751 4.354 10.3293 4.47051 10.9756L2.76776 12.4726L4.24276 15.0274L6.39701 14.2987C6.89768 14.7206 7.46748 15.0528 8.08126 15.2807L8.52501 17.5H10V18.75H8.52501C8.23599 18.75 7.95589 18.6499 7.73237 18.4667C7.50885 18.2835 7.35573 18.0285 7.29907 17.7451L6.98426 16.1709C6.70033 16.032 6.42635 15.8737 6.16426 15.697L4.64295 16.2116C4.36924 16.3044 4.0718 16.2994 3.80136 16.1975C3.53091 16.0955 3.30422 15.9029 3.15995 15.6524L1.68457 13.0976C1.54013 12.8473 1.48685 12.5547 1.53378 12.2695C1.58072 11.9844 1.72497 11.7243 1.94201 11.5335L3.14239 10.4785C3.13126 10.3204 3.12501 10.1611 3.12501 10C3.12501 9.86552 3.13433 9.73344 3.14365 9.60122C3.14539 9.57649 3.14714 9.55176 3.14882 9.527L1.94201 8.4665C1.72497 8.2757 1.58072 8.01562 1.53378 7.73047C1.48685 7.44533 1.54013 7.15273 1.68457 6.90244L3.15995 4.34756C3.30422 4.09712 3.53091 3.90449 3.80136 3.80253C4.0718 3.70056 4.36924 3.69558 4.64295 3.78844L6.15507 4.3C6.42028 4.12395 6.69743 3.96659 6.98451 3.82906L7.29932 2.25494C7.35598 1.97157 7.50906 1.71659 7.73252 1.53337C7.95599 1.35015 8.23604 1.25001 8.52501 1.25H11.475C11.764 1.24995 12.0441 1.35006 12.2676 1.53329C12.4912 1.71651 12.6443 1.97153 12.7009 2.25494L13.0158 3.82906C13.2996 3.96808 13.5736 4.12643 13.8358 4.303L15.3571 3.78844C15.6308 3.69558 15.9282 3.70056 16.1987 3.80253C16.4691 3.90449 16.6958 4.09712 16.8401 4.34756ZM10 12.5C9.66966 12.5075 9.34121 12.4479 9.03451 12.325C8.72781 12.202 8.44922 12.0181 8.21556 11.7845C7.9819 11.5508 7.79803 11.2722 7.67505 10.9655C7.55206 10.6588 7.49252 10.3304 7.50001 10C7.49252 9.66965 7.55206 9.3412 7.67505 9.0345C7.79803 8.7278 7.9819 8.44921 8.21556 8.21555C8.44922 7.9819 8.72781 7.79802 9.03451 7.67504C9.34121 7.55205 9.66966 7.49251 10 7.5C10.3304 7.49251 10.6588 7.55205 10.9655 7.67504C11.2722 7.79802 11.5508 7.9819 11.7845 8.21555C12.0181 8.44921 12.202 8.7278 12.325 9.0345C12.448 9.3412 12.5075 9.66965 12.5 10H13.75C13.75 9.25832 13.5301 8.5333 13.118 7.91661C12.706 7.29993 12.1203 6.81928 11.4351 6.53545C10.7499 6.25163 9.99585 6.17736 9.26842 6.32206C8.54099 6.46675 7.87281 6.8239 7.34836 7.34835C6.82391 7.8728 6.46676 8.54098 6.32207 9.26841C6.17737 9.99584 6.25163 10.7498 6.53546 11.4351C6.81929 12.1203 7.29994 12.706 7.91662 13.118C8.53331 13.5301 9.25833 13.75 10 13.75V12.5ZM18.75 12.5H12.5V13.75H18.75V12.5ZM18.75 15H12.5V16.25H18.75V15ZM12.5 17.5H18.75V18.75H12.5V17.5Z" fill="black" />
  </svg>

const ChevronUp: React.FC<IconProps> = (props) =>
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <mask id="path-1-inside-1_604_28" fill="white">
      <path d="M8 5L13 10L12.3 10.7L8 6.4L3.7 10.7L3 10L8 5Z" />
    </mask>
    <path d="M8 5L13 10L12.3 10.7L8 6.4L3.7 10.7L3 10L8 5Z" fill="black" />
    <path d="M8 5L8.70711 4.29289L8 3.58579L7.29289 4.29289L8 5ZM13 10L13.7071 10.7071L14.4142 10L13.7071 9.29289L13 10ZM12.3 10.7L11.5929 11.4071L12.3 12.1142L13.0071 11.4071L12.3 10.7ZM8 6.4L8.70711 5.69289L8 4.98579L7.29289 5.69289L8 6.4ZM3.7 10.7L2.99289 11.4071L3.7 12.1142L4.40711 11.4071L3.7 10.7ZM3 10L2.29289 9.29289L1.58579 10L2.29289 10.7071L3 10ZM7.29289 5.70711L12.2929 10.7071L13.7071 9.29289L8.70711 4.29289L7.29289 5.70711ZM12.2929 9.29289L11.5929 9.99289L13.0071 11.4071L13.7071 10.7071L12.2929 9.29289ZM13.0071 9.99289L8.70711 5.69289L7.29289 7.10711L11.5929 11.4071L13.0071 9.99289ZM7.29289 5.69289L2.99289 9.99289L4.40711 11.4071L8.70711 7.10711L7.29289 5.69289ZM4.40711 9.99289L3.70711 9.29289L2.29289 10.7071L2.99289 11.4071L4.40711 9.99289ZM3.70711 10.7071L8.70711 5.70711L7.29289 4.29289L2.29289 9.29289L3.70711 10.7071Z" fill="#2622FF" mask="url(#path-1-inside-1_604_28)" />
  </svg>

interface ChevronProps {
  /** @default true */
  up?: boolean
  down?: boolean
}

export const Chevron: React.FC<IconProps & ChevronProps> = ({ up = true, down, className, ...props }) => <ChevronUp {...props} className={twMerge(className, down || !up ? 'rotate-180' : '')} />

export const Pen: React.FC<IconProps> = (props) =>
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.92521 0.975L10.2752 2.325C10.5752 2.625 10.5752 3.075 10.2752 3.375L4.65021 9H2.25021V6.6L7.87521 0.975C8.17521 0.675 8.62521 0.675 8.92521 0.975ZM9.75021 2.85L8.40021 1.5L7.27521 2.625L8.62521 3.975L9.75021 2.85ZM3.00021 6.9V8.25H4.35021L8.10021 4.5L6.75021 3.15L3.00021 6.9ZM1.50021 10.5V9.75H12.0002V10.5H1.50021Z" fill="#2622FF" />
  </svg>

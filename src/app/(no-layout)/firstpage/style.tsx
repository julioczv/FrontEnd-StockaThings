import styled from "styled-components";
import {AppBar, Box, Button, Paper, Typography} from "@mui/material";

export const Header = styled(AppBar)`
    background: transparent;
    color: inherit;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
    backdrop-filter: saturate(120%) blur(6px);
`;

export const Brand = styled(Typography)`
    font-weight: 800 !important;
    color: #0C5144;
`;

export const Hero = styled.section`
    padding: 96px 0;
    text-align: center;
    background: transparent;
`;

export const CTAButton = styled(Button)`
    font-weight: 700 !important;
    padding: 12px 28px !important;
    border-radius: 12px !important;
`;

export const Features = styled.section`
    padding: 96px 0;
    background: #F3F4F6;
`;

export const FeatureCard = styled(Paper)`
    text-align: center;
    padding: 24px;
    height: 100%;
    border-radius: 16px !important;
`;

export const IconBubble = styled(Box)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    padding: 14px;
    margin-bottom: 12px;
    background: rgba(31, 162, 135, 0.25);
`;

export const Pricing = styled.section`
    padding: 96px 0;
`;

export const PriceCard = styled(Paper)`
    position: relative;
    border-radius: 20px !important;
    padding: 32px;
    max-width: 560px;
    width: 100%;
`;

export const Ribbon = styled(Box)`
    position: absolute;
    top: -8px;
    right: 24px;
    background: #1FA287;
    color: #fff;
    font-weight: 800;
    padding: 6px 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: 0.85rem;
`;

export const Footer = styled.footer`
    padding: 64px 0;
    background: #0C5144;
    color: #fff;
    text-align: center;
`;
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '../../presentation/components/SEO';

describe('SEO Component', () => {
  const renderWithHelmet = (ui: React.ReactElement) => {
    return render(
      <HelmetProvider>
        {ui}
      </HelmetProvider>
    );
  };

  it('varsayılan başlığı doğru ayarlar', () => {
    renderWithHelmet(<SEO />);
    // HelmetProvider ile title kontrolü
    expect(document.title).toBe('ArchAcademy | The Senior Architect Portal');
  });

  it('özel başlık doğru ayarlar', () => {
    renderWithHelmet(<SEO title="Clean Architecture" />);
    expect(document.title).toBe('Clean Architecture | ArchAcademy');
  });

  it('varsayılan açıklama doğru ayarlar', () => {
    renderWithHelmet(<SEO />);
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).not.toBeNull();
    expect(metaDescription?.getAttribute('content')).toContain('ArchAcademy');
  });

  it('özel açıklama doğru ayarlar', () => {
    renderWithHelmet(<SEO description="Test açıklaması" />);
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toBe('Test açıklaması');
  });

  it('anahtar kelimeleri doğru ayarlar', () => {
    renderWithHelmet(<SEO keywords="test, keywords" />);
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    expect(metaKeywords?.getAttribute('content')).toBe('test, keywords');
  });

  it('Open Graph etiketlerini doğru ayarlar', () => {
    renderWithHelmet(<SEO title="Test" />);
    const ogType = document.querySelector('meta[property="og:type"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogType?.getAttribute('content')).toBe('website');
    expect(ogTitle?.getAttribute('content')).toBe('Test | ArchAcademy');
  });

  it('Twitter Card etiketlerini doğru ayarlar', () => {
    renderWithHelmet(<SEO />);
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
  });

  it('canonical URL doğru ayarlar', () => {
    renderWithHelmet(<SEO canonicalUrl="/test" />);
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe('https://archacademy.com/test');
  });

  it('theme-color meta etiketi doğru ayarlar', () => {
    renderWithHelmet(<SEO />);
    const themeColor = document.querySelector('meta[name="theme-color"]');
    expect(themeColor?.getAttribute('content')).toBe('#3b82f6');
  });
});
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed with Anna TX data...')

  // Clear existing data
  await prisma.artistSponsorMatch.deleteMany({})
  await prisma.grantArtistMatch.deleteMany({})
  await prisma.courseEnrollment.deleteMany({})
  await prisma.courseModule.deleteMany({})
  await prisma.course.deleteMany({})
  await prisma.eventAttendee.deleteMany({})
  await prisma.event.deleteMany({})
  await prisma.purchase.deleteMany({})
  await prisma.sale.deleteMany({})
  await prisma.gift.deleteMany({})
  await prisma.grant.deleteMany({})
  await prisma.portfolio.deleteMany({})
  await prisma.artistSubscription.deleteMany({})
  await prisma.artist.deleteMany({})
  await prisma.customer.deleteMany({})
  await prisma.sponsor.deleteMany({})
  await prisma.session.deleteMany({})
  await prisma.account.deleteMany({})
  await prisma.user.deleteMany({})

  console.log('✅ Cleared existing data')

  // ============================================================================
  // CREATE 25 REAL ANNA TEXAS ARTISTS (from your list)
  // ============================================================================
  console.log('👨‍🎨 Creating 25 Anna TX artists...')

  const artistsList = [
    // Painters
    {
      name: 'Ava',
      studioName: 'Ava Color Studio',
      medium: 'Acrylic',
      experience: 'Emerging',
      city: 'Anna',
      email: 'ava@annatexasart.org',
      phone: '469-555-1001',
      facebook: 'facebook.com/ava.color',
      instagram: '@ava.color',
      website: 'annatexasart.org/ava',
      hasStore: true,
      hasProducts: true,
    },
    {
      name: 'Liam',
      studioName: 'Liam Brushworks',
      medium: 'Oil',
      experience: 'Pro',
      city: 'Melissa',
      email: 'liam@annatexasart.org',
      phone: '469-555-1002',
      facebook: 'facebook.com/liam.brush',
      instagram: '@liam.brush',
      website: 'annatexasart.org/liam',
      hasStore: true,
      hasProducts: true,
    },
    {
      name: 'Mia',
      studioName: 'Mia Canvas Co.',
      medium: 'Watercolor',
      experience: 'Hobbyist',
      city: 'Van Alstyne',
      email: 'mia@annatexasart.org',
      phone: '469-555-1003',
      facebook: 'facebook.com/mia.canvas',
      instagram: '@mia.canvas',
      website: 'annatexasart.org/mia',
      hasStore: false,
      hasProducts: false,
    },
    {
      name: 'Noah',
      studioName: 'Noah Fine Arts',
      medium: 'Mixed Media',
      experience: 'Expert',
      city: 'Anna',
      email: 'noah@annatexasart.org',
      phone: '469-555-1004',
      facebook: 'facebook.com/noah.finearts',
      instagram: '@noah.finearts',
      website: 'annatexasart.org/noah',
      hasStore: true,
      hasProducts: true,
    },
    {
      name: 'Ella',
      studioName: 'Ella Studio North',
      medium: 'Gouache',
      experience: 'New',
      city: 'Melissa',
      email: 'ella@annatexasart.org',
      phone: '469-555-1005',
      facebook: 'facebook.com/ella.studio',
      instagram: '@ella.studio',
      website: 'annatexasart.org/ella',
      hasStore: false,
      hasProducts: true,
    },
    // Sculptors
    {
      name: 'Jack',
      studioName: 'Jack Stoneworks',
      medium: 'Clay',
      experience: 'Emerging',
      city: 'Anna',
      email: 'jack@annatexasart.org',
      phone: '469-555-1006',
      facebook: 'facebook.com/jack.stone',
      instagram: '@jack.stone',
      website: 'annatexasart.org/jack',
      hasStore: true,
      hasProducts: true,
    },
    {
      name: 'Grace',
      studioName: 'Grace Forge Studio',
      medium: 'Metal',
      experience: 'Pro',
      city: 'Melissa',
      email: 'grace@annatexasart.org',
      phone: '469-555-1007',
      facebook: 'facebook.com/grace.forge',
      instagram: '@grace.forge',
      website: 'annatexasart.org/grace',
      hasStore: true,
      hasProducts: true,
    },
    {
      name: 'Henry',
      studioName: 'Henry Clay Collective',
      medium: 'Ceramic',
      experience: 'Hobbyist',
      city: 'Van Alstyne',
      email: 'henry@annatexasart.org',
      phone: '469-555-1008',
      facebook: 'facebook.com/henry.clay',
      instagram: '@henry.clay',
      website: 'annatexasart.org/henry',
      hasStore: false,
      hasProducts: false,
    },
    {
      name: 'Chloe',
      studioName: 'Chloe Sculpture Lab',
      medium: 'Wood',
      experience: 'Expert',
      city: 'Anna',
      email: 'chloe@annatexasart.org',
      phone: '469-555-1009',
      facebook: 'facebook.com/chloe.sculpt',
      instagram: '@chloe.sculpt',
      website: 'annatexasart.org/chloe',
      hasStore: true,
      hasProducts: true,
    },
    {
      name: 'Owen',
      studioName: 'Owen Iron Studio',
      medium: 'Iron',
      experience: 'New',
      city: 'Melissa',
      email: 'owen@annatexasart.org',
      phone: '469-555-1010',
      facebook: 'facebook.com/owen.iron',
      instagram: '@owen.iron',
      website: 'annatexasart.org/owen',
      hasStore: false,
      hasProducts: true,
    },
  ]

  // Add 15 more placeholder artists to reach 25
  const placeholderArtists = Array.from({ length: 15 }).map((_, i) => ({
    name: `Artist ${i + 11}`,
    studioName: `Studio ${i + 11}`,
    medium: ['Acrylic', 'Oil', 'Digital', 'Sculpture'][i % 4],
    experience: ['Emerging', 'Pro', 'Expert', 'Hobbyist'][i % 4],
    city: ['Anna', 'Melissa', 'Van Alstyne'][i % 3],
    email: `artist${i + 11}@annatexasart.org`,
    phone: `469-555-${1011 + i}`,
    facebook: `facebook.com/artist${i + 11}`,
    instagram: `@artist${i + 11}`,
    website: `annatexasart.org/artist${i + 11}`,
    hasStore: i % 2 === 0,
    hasProducts: true,
  }))

  const allArtists = [...artistsList, ...placeholderArtists]

  const artistUsers = await Promise.all(
    allArtists.map((artist) =>
      prisma.user.create({
        data: {
          email: artist.email,
          name: `${artist.name} (${artist.studioName})`,
          emailVerified: new Date(),
        },
      })
    )
  )

  const artists = await Promise.all(
    artistUsers.map((user, idx) => {
      const artistData = allArtists[idx]
      const experienceTier = {
        New: 'FREE',
        Hobbyist: 'FREE',
        Emerging: 'PRO',
        Pro: 'PRO',
        Expert: 'MASTER',
      }[artistData.experience]

      return prisma.artist.create({
        data: {
          userId: user.id,
          profileName: artistData.studioName,
          bioStatement: `${artistData.name} creates stunning ${artistData.medium} artwork in ${artistData.city}, Texas. Featured in local galleries and private collections.`,
          verificationStatus: idx < 10 ? 'VERIFIED' : 'PENDING',
          tier: experienceTier,
          monthlyMRR: idx % 3 === 0 ? Math.floor(Math.random() * 10000) : 0,
          big5Scores: {
            openness: 85 + Math.random() * 15,
            conscientiousness: 65 + Math.random() * 20,
            extraversion: 60 + Math.random() * 30,
            agreeableness: 70 + Math.random() * 25,
            neuroticism: 35 + Math.random() * 30,
          },
          styleFingerprint: {
            medium: artistData.medium,
            style: `${artistData.medium} ${artistData.experience}`,
            colorPalette: [
              '#FF6B6B',
              '#4ECDC4',
              '#45B7D1',
              '#2C3E50',
              '#ECF0F1',
            ],
            emotionalTone: ['vibrant', 'serene', 'intense', 'playful'][idx % 4],
            uniquenessScore: 0.65 + Math.random() * 0.3,
          },
          trendFitScore: 0.6 + Math.random() * 0.4,
          competitivePosition: {
            marketSegment: `${artistData.medium} Artists`,
            priceRange: '$500-$5000',
            demand: 'rising',
          },
          hiddenOpportunities: [
            `Teaching ${artistData.medium} workshops`,
            `Corporate art commissions`,
            `Grant opportunities matching ${artistData.medium}`,
          ],
        },
      })
    })
  )

  console.log(`✅ Created ${artists.length} Anna TX artists`)

  // ============================================================================
  // CREATE 15 REAL ANNA TEXAS BUSINESS SPONSORS
  // ============================================================================
  console.log('🤝 Creating 15 Anna TX business sponsors...')

  const sponsorsList = [
    // Banks
    {
      name: 'State Bank of Texas',
      type: 'Bank',
      city: 'Anna',
      motivations: { community: 0.9, brand: 0.7 },
    },
    {
      name: 'Trinity Bank',
      type: 'Bank',
      city: 'Anna',
      motivations: { community: 0.85, tax: 0.6 },
    },
    // Coffee Shops & Restaurants
    {
      name: 'Main Street Coffee',
      type: 'Coffee Shop',
      city: 'Anna',
      motivations: { community: 0.8, brand: 0.8 },
    },
    {
      name: 'The Gathering Table',
      type: 'Restaurant',
      city: 'Melissa',
      motivations: { community: 0.75, aesthetic: 0.85 },
    },
    {
      name: 'Anna Italian Kitchen',
      type: 'Restaurant',
      city: 'Anna',
      motivations: { community: 0.8, brand: 0.7 },
    },
    {
      name: 'Brew & Board',
      type: 'Coffee Shop',
      city: 'Van Alstyne',
      motivations: { community: 0.7, brand: 0.8 },
    },
    // Retail & Services
    {
      name: 'Prestige Salon & Spa',
      type: 'Salon',
      city: 'Anna',
      motivations: { aesthetic: 0.9, community: 0.6 },
    },
    {
      name: 'Anna Home Furnishings',
      type: 'Retail',
      city: 'Anna',
      motivations: { aesthetic: 0.85, brand: 0.7 },
    },
    {
      name: 'Melissa Gift Gallery',
      type: 'Retail',
      city: 'Melissa',
      motivations: { community: 0.75, aesthetic: 0.8 },
    },
    // Professional Services
    {
      name: 'Heartland Insurance Group',
      type: 'Insurance',
      city: 'Anna',
      motivations: { community: 0.8, tax: 0.6 },
    },
    {
      name: 'Anna Area Chamber of Commerce',
      type: 'Nonprofit',
      city: 'Anna',
      motivations: { community: 1.0, impact: 0.9 },
    },
    // Additional Local Businesses
    {
      name: 'Texas Pride Auto Repair',
      type: 'Auto Service',
      city: 'Melissa',
      motivations: { community: 0.7, brand: 0.6 },
    },
    {
      name: 'Wellness Works Clinic',
      type: 'Healthcare',
      city: 'Anna',
      motivations: { community: 0.85, impact: 0.7 },
    },
    {
      name: 'Van Alstyne Hardware & More',
      type: 'Hardware Store',
      city: 'Van Alstyne',
      motivations: { community: 0.8, brand: 0.5 },
    },
    {
      name: 'North Texas Property Group',
      type: 'Real Estate',
      city: 'Anna',
      motivations: { community: 0.75, brand: 0.8 },
    },
  ]

  const sponsorUsers = await Promise.all(
    sponsorsList.map((sponsor) =>
      prisma.user.create({
        data: {
          email: `contact@${sponsor.name.toLowerCase().replace(/\s+/g, '')}.local`,
          name: sponsor.name,
          emailVerified: new Date(),
        },
      })
    )
  )

  const sponsors = await Promise.all(
    sponsorUsers.map((user, idx) => {
      const sponsorData = sponsorsList[idx]

      return prisma.sponsor.create({
        data: {
          userId: user.id,
          name: sponsorData.name,
          email: user.email,
          organizationName: sponsorData.name,
          netWorth: 500000 + Math.random() * 5000000,
          givenTotalAmount: Math.floor(Math.random() * 100000) * 100,
          givenCount: Math.floor(Math.random() * 20),
          sponsorSegment: 'SOCIAL_CONNECTOR',
          big5Scores: {
            openness: 65 + Math.random() * 30,
            conscientiousness: 75 + Math.random() * 20,
            extraversion: 70 + Math.random() * 25,
            agreeableness: 75 + Math.random() * 20,
            neuroticism: 25 + Math.random() * 25,
          },
          givingMotivations: sponsorData.motivations,
          lifetimeValueScore: 60 + Math.floor(Math.random() * 35),
          majorGiftProbability: 0.3 + Math.random() * 0.5,
          churnRisk: 0.1 + Math.random() * 0.3,
          preferredChannels: {
            email: true,
            sms: Math.random() > 0.5,
            directMail: Math.random() > 0.5,
            events: true,
          },
        },
      })
    })
  )

  console.log(`✅ Created ${sponsors.length} Anna TX business sponsors`)

  // ============================================================================
  // CREATE ARTIST-SPONSOR MATCHES
  // ============================================================================
  console.log('🎯 Creating artist-sponsor matches...')

  let matchCount = 0
  for (let i = 0; i < Math.min(artists.length, sponsors.length); i++) {
    const artist = artists[i]
    const sponsor = sponsors[i % sponsors.length]

    try {
      await prisma.artistSponsorMatch.create({
        data: {
          artistId: artist.id,
          sponsorId: sponsor.id,
          matchScore: 0.65 + Math.random() * 0.35,
          reasoning: `${sponsor.name} is a great fit for ${artist.profileName}. Local business supporting local artists.`,
          recommendedAskAmount: 5000 + Math.floor(Math.random() * 45000),
          recommendedTiming: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          status: 'PENDING',
        },
      })
      matchCount++
    } catch {
      // Skip duplicate unique constraint violations
    }
  }

  console.log(`✅ Created ${matchCount} artist-sponsor matches`)

  // ============================================================================
  // CREATE 50 GRANTS (simplified)
  // ============================================================================
  console.log('💰 Creating 50 grants...')

  const grants = await Promise.all(
    Array.from({ length: 50 }).map((_, i) =>
      prisma.grant.create({
        data: {
          externalId: `grant_anna_tx_${i}`,
          name: `${['Texas', 'National', 'Regional', 'Community'][i % 4]} Arts Grant ${i + 1}`,
          description: `Funding opportunity for artists in North Texas region. Supports emerging and established artists.`,
          funder: ['National Endowment for the Arts', 'Texas Cultural Trust', 'Community Foundation', 'State Arts Council'][
            i % 4
          ],
          fundingAmount: (10000 + Math.random() * 90000) * 100, // in cents
          deadline: new Date(Date.now() + (30 + Math.random() * 300) * 24 * 60 * 60 * 1000),
          eligibility: {
            artistTypes: ['emerging', 'established'],
            mediums: ['all'],
            residency: ['Texas', 'US'],
          },
          aiSummary: `Grant opportunity for ${['painters', 'sculptors', 'mixed media artists', 'visual artists'][i % 4]} in North Texas.`,
        },
      })
    )
  )

  console.log(`✅ Created ${grants.length} grants`)

  // ============================================================================
  // CREATE GRANT-ARTIST MATCHES
  // ============================================================================
  console.log('🏆 Creating grant-artist matches...')

  let grantMatchCount = 0
  for (const artist of artists.slice(0, 15)) {
    for (let i = 0; i < 2; i++) {
      const grantIdx = Math.floor(Math.random() * grants.length)

      try {
        await prisma.grantArtistMatch.create({
          data: {
            grantId: grants[grantIdx].id,
            artistId: artist.id,
            matchScore: 0.6 + Math.random() * 0.4,
            reasoning: `Strong fit for emerging artist funding in ${artist.profileName}'s category.`,
            status: 'PENDING',
          },
        })
        grantMatchCount++
      } catch {
        // Skip duplicates
      }
    }
  }

  console.log(`✅ Created ${grantMatchCount} grant-artist matches`)

  // ============================================================================
  // CREATE 15 CUSTOMERS
  // ============================================================================
  console.log('👥 Creating 15 customers...')

  const customerUsers = await Promise.all(
    Array.from({ length: 15 }).map((_, i) =>
      prisma.user.create({
        data: {
          email: `customer${i + 1}@local.com`,
          name: `Customer ${i + 1}`,
          emailVerified: new Date(),
        },
      })
    )
  )

  const customers = await Promise.all(
    customerUsers.map((user, idx) =>
      prisma.customer.create({
        data: {
          userId: user.id,
          firstName: `Customer`,
          lastName: `${idx + 1}`,
          email: user.email,
          phone: `469-555-${2000 + idx}`,
          totalSpent: Math.floor(Math.random() * 50000) * 100,
          purchaseCount: Math.floor(Math.random() * 20),
          favoriteArtists: artists.slice(0, 2 + Math.floor(Math.random() * 3)).map((a) => a.id),
          interests: ['painting', 'sculpture', 'local art'],
        },
      })
    )
  )

  console.log(`✅ Created ${customers.length} customers`)

  // ============================================================================
  // CREATE SUBSCRIPTIONS
  // ============================================================================
  console.log('📅 Creating artist subscriptions...')

  const subscriptions = await Promise.all(
    artists.slice(0, 15).map((artist) =>
      prisma.artistSubscription.create({
        data: {
          artistId: artist.id,
          tier: artist.tier,
          stripePriceId: `price_test_${artist.id}`,
          stripeSubscriptionId: `sub_test_${artist.id}`,
          status: 'ACTIVE',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        },
      })
    )
  )

  console.log(`✅ Created ${subscriptions.length} subscriptions`)

  console.log('✨ Seed completed successfully! 🎨')
  console.log(`
📊 SUMMARY:
  • Artists: ${artists.length}
  • Sponsors: ${sponsors.length}
  • Grants: ${grants.length}
  • Customers: ${customers.length}
  • Artist-Sponsor Matches: ${matchCount}
  • Grant-Artist Matches: ${grantMatchCount}
  `)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

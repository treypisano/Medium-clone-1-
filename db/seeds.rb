require "faker"
puts "Seeding data..."

Article.destroy_all
User.destroy_all

25.times do 
    test_user = User.create({email: Faker::Internet.email, password: "password"})

    Article.create({
        title: Faker::Games::LeagueOfLegends.quote,
        body: Faker::Lorem.paragraph,
        user_id: test_user.id,
    })
end


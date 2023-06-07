require "faker"
puts "Seeding data..."
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
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


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movies } from './movies.entity';
@Injectable()
export class MoviesService {
    constructor(@InjectRepository(Movies) private repo: Repository<Movies>) {}
    
    create(title: string, link: string) {
        const user = this.repo.create({ title, link });
        return this.repo.save(user);
    }

    findOne(id: number) {   
        if (!id) {  
            return null;
        }
        return this.repo.findOneBy({ id });
    }

    findAll() {
        return this.repo.find();
    }
    
}

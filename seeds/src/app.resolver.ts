import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {

    @Query(() => String)
    home(): string {
        return '';
    }
    
}
